import mongoose, { Schema } from "mongoose";
export const sort = new Schema({
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
export const sortSchema = new Schema({
    currentActivePath: String,
    sort: [sort],
});
const DramaModel = mongoose.model("sort", sortSchema);
export default DramaModel;
