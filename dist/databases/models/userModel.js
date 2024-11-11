// models/UserModel.ts
import { model, Schema } from "mongoose";
var userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    is_bot: { type: Boolean, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    username: { type: String },
    language_code: { type: String },
    is_premium: { type: Boolean },
    added_to_attachment_menu: { type: Boolean },
});
var UserModel = model("user", userSchema);
export default UserModel;
