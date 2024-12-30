import mongoose, { Schema } from "mongoose";
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
        duration: { type: Number, required: false }, // Optional field
        expires_at: { type: Date, required: false }, // Optional field
        activated_at: { type: Date, default: Date.now },
        details: { type: String, required: false }, // Optional field
    },
});
export default mongoose.model("Token", TokenSchema);
