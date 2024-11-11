import mongoose, { Schema } from "mongoose";
export var linkSchema = new Schema({
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
export var aioSchema = new Schema({
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
}, { timestamps: true });
var DramaModel = mongoose.model("aio", aioSchema);
export var HindiDramaModel = mongoose.model("hindiDrama", aioSchema);
export default DramaModel;
