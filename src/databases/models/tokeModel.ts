import mongoose, { Schema } from "mongoose";
import { ITokenDocument } from "../interfaces/token.js";

const TokenSchema = new Schema<ITokenDocument>({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<ITokenDocument>("Token", TokenSchema);
