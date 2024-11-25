import mongoose, { Schema } from "mongoose";
var TokenSchema = new Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});
export default mongoose.model("Token", TokenSchema);
