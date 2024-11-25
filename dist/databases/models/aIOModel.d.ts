import mongoose, { Model } from "mongoose";
import { Link, AIODocument } from "../interfaces/aIO.js";
export declare const linkSchema: mongoose.Schema<Link, mongoose.Model<Link, any, any, any, mongoose.Document<unknown, any, Link> & Link & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Link, mongoose.Document<unknown, {}, mongoose.FlatRecord<Link>> & mongoose.FlatRecord<Link> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const aioSchema: mongoose.Schema<AIODocument, mongoose.Model<AIODocument, any, any, any, mongoose.Document<unknown, any, AIODocument> & AIODocument & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, AIODocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<AIODocument>> & mongoose.FlatRecord<AIODocument> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const DramaModel: Model<AIODocument>;
export declare const HindiDramaModel: Model<AIODocument>;
export default DramaModel;
