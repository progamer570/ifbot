import { Model } from "mongoose";
export interface MessageDocument {
    shareId: number;
    messageIds: number[];
}
declare const MessageModel: Model<MessageDocument>;
export default MessageModel;
