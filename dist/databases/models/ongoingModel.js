import mongoose, { Schema } from "mongoose";
export var ongSchema = new Schema({
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
    status: {
        type: String,
        enum: ["ongoing", "complete"],
        default: "ongoing",
    },
}, { timestamps: true });
var ongoingModel = mongoose.model("ongoing", ongSchema);
export default ongoingModel;
