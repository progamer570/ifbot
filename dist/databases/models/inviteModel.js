import mongoose, { Schema } from "mongoose";
var userSchema = new Schema({
    userId: { type: String, required: true },
    inviteUsed: {
        type: Number,
        default: 0,
    },
    invites: [
        {
            username: { type: String, required: true },
            userId: { type: String, required: true },
        },
    ],
    lastRequestDate: { type: Date, default: Date.now },
    dailyRequests: { type: Number, default: 5 },
});
var InviteModel = mongoose.model("InviteUser", userSchema);
export default InviteModel;
