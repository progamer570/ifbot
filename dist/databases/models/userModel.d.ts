import { Model, Document } from "mongoose";
import { User } from "telegraf/typings/core/types/typegram";
export type UserDocument = User & Document;
declare const UserModel: Model<UserDocument>;
export default UserModel;
