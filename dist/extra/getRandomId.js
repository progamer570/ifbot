import crypto from "crypto";
export default function getRandomId() {
    var buffer = crypto.randomBytes(4);
    return buffer.readUInt32BE(0);
}
