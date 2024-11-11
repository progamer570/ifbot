import mongoDB from "../databases/mongoDB.js";
import env from "../services/env.js";
import reqDB from "../databases/oneDayOneReq.js";
export default function getProperDB() {
    var databaseUrl = env.databaseUrl;
    if (databaseUrl) {
        if (databaseUrl.startsWith("mongodb")) {
            return mongoDB;
        }
    }
    // return inMemory;
    return mongoDB;
}
export function getReqDB() {
    return reqDB;
}
