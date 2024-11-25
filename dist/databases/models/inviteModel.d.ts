import { Document, Model } from "mongoose";
import { InviteUser } from "../interfaces/inviteUser.js";
export interface IUserDocument extends InviteUser, Document {
}
declare const InviteModel: Model<IUserDocument>;
export default InviteModel;
