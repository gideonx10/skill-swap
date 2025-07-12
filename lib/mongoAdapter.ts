// lib/mongoAdapter.ts
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongo";

export const authAdapter = MongoDBAdapter(clientPromise);
