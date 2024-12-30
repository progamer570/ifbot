import mongoose, { Schema } from "mongoose";
// Define the Token Schema
var TokenSchema = new Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    bot_premium: {
        is_bot_premium: { type: Boolean, default: false },
        subscriptionType: {
            type: String,
            enum: ["Gold", "Silver", "Platinum", "Other"],
            required: false,
        },
        duration: { type: Number, required: false },
        expires_at: { type: Date, required: false },
        activated_at: { type: Date, default: Date.now },
        details: { type: String, required: false },
        required: false,
    },
});
export default mongoose.model("Token", TokenSchema);
