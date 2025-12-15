// models/MessageModel.ts
import { model, Schema, Model } from "mongoose";

export interface MessageDocument {
  shareId: number;
  messageIds: number[];
}

const MessageModel: Model<MessageDocument> = model<MessageDocument>(
  "message",
  new Schema({
    shareId: { type: Number, required: true, unique: true },
    messageIds: { type: [Number], required: true },
  })
);

export default MessageModel;
