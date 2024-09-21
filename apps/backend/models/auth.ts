import { ObjectId } from "mongodb";
import db from "../services/mongoConnection";
import type { ObjectId as TObjectId, WithId } from "mongodb";
import type { TUser } from "../types";

const users = db.collection<TUser>("users")
export const loginUser = async ({ data }: { data: { username: string } }) => {
  const resp = await users.findOne({ username: data.username })
  return resp;
}
