import clientPromise from "./mongo";
import { User } from "@/types/user";
import { SwapRequest } from "@/types/request";
import { Feedback } from "@/types/feedback";

export async function getUsersCollection() {
  const client = await clientPromise;
  return client.db("skill_swap").collection<User>("users");
}

export async function getRequestsCollection() {
  const client = await clientPromise;
  return client.db("skill_swap").collection<SwapRequest>("requests");
}

export async function getFeedbackCollection() {
  const client = await clientPromise;
  return client.db("skill_swap").collection<Feedback>("feedback");
}

