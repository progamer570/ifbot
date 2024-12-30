import mongoose from "mongoose";
import { ITokenDocument } from "../interfaces/token.js";
declare const _default: mongoose.Model<ITokenDocument, {}, {}, {}, mongoose.Document<unknown, {}, ITokenDocument> & ITokenDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
