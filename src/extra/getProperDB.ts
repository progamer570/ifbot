import inMemory from "../databases/inMemory.js";
import mongoDB from "../databases/mongoDB.js";
import { DatabaseClient, RequestDBClient } from "../interfaces.js";
import env from "../services/env.js";
import reqDB from "../databases/oneDayOneReq.js";

export default function getProperDB(): DatabaseClient {
  const databaseUrl = env.databaseUrl;

  if (databaseUrl) {
    if (databaseUrl.startsWith("mongodb")) {
      return mongoDB;
    }
  }
  // return inMemory;
  return mongoDB;
}
export function getReqDB(): RequestDBClient {
  return reqDB;
}
