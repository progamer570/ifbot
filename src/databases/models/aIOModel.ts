import mongoose, { Model, Schema } from "mongoose";
import { Link, AIODocument } from "../interfaces/aIO.js";

export const linkSchema = new Schema<Link>({
  episodeNumber: {
    type: Number,
    required: true,
  },
  shortUrl: {
    type: String,
    default: "no link",
  },
  teleUrl: {
    type: String,
    required: true,
  },
});

export const aioSchema = new Schema<AIODocument>(
  {
    shareId: {
      type: Number,
      required: true,
      unique: true,
    },
    messageIds: {
      type: [Number],
      required: true,
    },
    aIOTitle: {
      type: String,
      required: true,
    },
    aIOPosterID: {
      type: String,
      required: true,
    },
    aioShortUrl: {
      type: String,
      required: true,
    },
    episodes: [linkSchema],
  },
  { timestamps: true }
);

const DramaModel: Model<AIODocument> = mongoose.model("aio", aioSchema);
export const HindiDramaModel: Model<AIODocument> = mongoose.model("hindiDrama", aioSchema);

export default DramaModel;
