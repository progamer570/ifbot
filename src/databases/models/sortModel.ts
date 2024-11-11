import mongoose, { Model, Schema } from "mongoose";
import { Sort, SortDocument } from "../interfaces/sort.js";

export const sort = new Schema<Sort>(
  {
    shareId: {
      type: Number,
      required: true,
      unique: true,
    },
    aioShortUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const sortSchema = new Schema<SortDocument>({
  sort: [sort],
});

const DramaModel: Model<SortDocument> = mongoose.model("sort", sortSchema);

export default DramaModel;
