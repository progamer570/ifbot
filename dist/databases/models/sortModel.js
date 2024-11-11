import mongoose, { Schema } from "mongoose";
export var sort = new Schema({
    shareId: {
        type: Number,
        required: true,
        unique: true,
    },
    aioShortUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export var sortSchema = new Schema({
    sort: [sort],
});
var DramaModel = mongoose.model("sort", sortSchema);
export default DramaModel;
