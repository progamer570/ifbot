import mongoose, { Document, Schema, Model } from "mongoose";
import { InviteUser } from "../interfaces/inviteUser.js";

export interface IUserDocument extends InviteUser, Document {}

const userSchema: Schema<IUserDocument> = new Schema({
  userId: { type: String, required: true },
  inviteUsed: {
    type: Number,
    default: 0,
  },
  invites: [
    {
      username: { type: String, required: true },
      userId: { type: String, required: true },
    },
  ],
  lastRequestDate: { type: Date, default: Date.now },
  dailyRequests: { type: Number, default: 5 },
});

const InviteModel: Model<IUserDocument> = mongoose.model<IUserDocument>("InviteUser", userSchema);

export default InviteModel;
