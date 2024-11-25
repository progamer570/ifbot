import mongoose, { Model } from "mongoose";
import { OngoingDocument } from "../interfaces/ongoingDocument.js";
export declare const ongSchema: mongoose.Schema<OngoingDocument, mongoose.Model<OngoingDocument, any, any, any, mongoose.Document<unknown, any, OngoingDocument> & OngoingDocument & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, OngoingDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<OngoingDocument>> & mongoose.FlatRecord<OngoingDocument> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const ongoingModel: Model<OngoingDocument>;
export default ongoingModel;
