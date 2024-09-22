import { ObjectId, type WithId } from "mongodb";
import db from "../services/mongoConnection";
import type { TTask, TTaskGetListRequest, TTaskPostRequest, TTaskPutRequest, TUser } from "../types";

const users = db.collection<TUser>("users")

export const createTask = async ({ data }: { data: TTaskPostRequest }) => {
  console.log(data)
  const taskId = new ObjectId();
  const result = await users.updateOne(
    { _id: new ObjectId(data.id) },
    {
      $push: {
        taskList: {
          $each: [{
            _id: taskId,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
          }],
          $position: 0
        }
      }
    }
  )
  Object.assign(result, { taskId })
  return result
}

export const getAllTasks = async ({ data }: { data: TTaskGetListRequest }) => {
  const result = await users.find({ _id: new ObjectId(data.id) }).project<TTask[]>({ _id: 0, taskList: 1 }).tryNext();
  if (!result) return [] as TTask[];
  return result;
}

export const deleteTask = () => {

}

export const updateTask = async ({ data }: { data: TTaskPutRequest }) => {
  console.log(data)
  // const result = await users.findOne({
  //   "taskList._id": new ObjectId(data._id)
  // })
  const result = await users.updateOne(
    {
      _id: ObjectId.createFromHexString(data.id),
      "taskList._id": ObjectId.createFromHexString(data._id as unknown as string)
    },
    {
      $set: {
        'taskList.$': {
          ...data,
          _id: ObjectId.createFromHexString(data._id as unknown as string),
          updatedAt: new Date()
        }
      }
    })
  console.log(result)
  return result
}
