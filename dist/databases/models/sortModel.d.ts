import mongoose, { Model } from "mongoose";
import { Sort, SortDocument } from "../interfaces/sort.js";
export declare const sort: mongoose.Schema<Sort, mongoose.Model<Sort, any, any, any, mongoose.Document<unknown, any, Sort> & Sort & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Sort, mongoose.Document<unknown, {}, mongoose.FlatRecord<Sort>> & mongoose.FlatRecord<Sort> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const sortSchema: mongoose.Schema<SortDocument, mongoose.Model<SortDocument, any, any, any, mongoose.Document<unknown, any, SortDocument> & SortDocument & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, SortDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<SortDocument>> & mongoose.FlatRecord<SortDocument> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const DramaModel: Model<SortDocument>;
export default DramaModel;
