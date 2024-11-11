/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
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
