import { ObjectId } from "mongodb";
import db from "../services/mongoConnection";
import type { TUser, TUserPostRequest } from "../types";

const users = db.collection<TUser>("users")

export const createUser = async ({ data }: { data: TUserPostRequest }) => {
  const resp = await users.insertOne({ ...data, taskList: [] })
  return resp
}

export const getUser = () => {

}

export const deleteUser = () => {

}

export const updateUser = () => {

}
