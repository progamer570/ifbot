var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import auth from "../../services/auth.js";
import database from "../../services/database.js";
import { delay } from "../../extra/delay.js";
import { sendToLogGroup } from "../../utils/sendToCollection.js";
import env from "../../services/env.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
var broadcastActive = true;
export default function myBroadcastHandler(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, text, user, error_1, referencedMessage, users, successCount, _i, _a, user, error_2, _b, _c, user, error_3, error_4;
        var _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    userId = (_e = (_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : 0;
                    if (!ctx.message || !("text" in ctx.message))
                        return [2 /*return*/];
                    text = ctx.message.text.replace("/broadcast", "").trim();
                    // Ensure the command is only used in private chats
                    if (((_f = ctx.chat) === null || _f === void 0 ? void 0 : _f.type) !== "private") {
                        return [2 /*return*/, ctx.reply("This command can only be used in private chats.")];
                    }
                    // Check if the user is an admin
                    if (!auth.isAdmin(userId)) {
                        return [2 /*return*/, ctx.reply("Only admins can broadcast messages.")];
                    }
                    // Handle cancel command
                    if (ctx.message.text.includes("cancel")) {
                        broadcastActive = false;
                        return [2 /*return*/];
                    }
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 3, , 4]);
                    user = {
                        id: ((_g = ctx.from) === null || _g === void 0 ? void 0 : _g.id) || 0,
                        firstname: ((_h = ctx.from) === null || _h === void 0 ? void 0 : _h.first_name) || "",
                        username: ((_j = ctx.from) === null || _j === void 0 ? void 0 : _j.username) || "",
                    };
                    return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("Broadcasted started by", user))];
                case 2:
                    _k.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _k.sent();
                    console.error("Error logging broadcast:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    referencedMessage = ctx.message.reply_to_message;
                    if (!referencedMessage && !text) {
                        return [2 /*return*/, ctx.reply("Please provide a message to broadcast.\nUsage: /broadcast <message> or reply to a message.")];
                    }
                    _k.label = 5;
                case 5:
                    _k.trys.push([5, 24, , 25]);
                    return [4 /*yield*/, database.getAllUserIds()];
                case 6:
                    users = _k.sent();
                    successCount = 0;
                    if (!referencedMessage) return [3 /*break*/, 15];
                    _i = 0, _a = users;
                    _k.label = 7;
                case 7:
                    if (!(_i < _a.length)) return [3 /*break*/, 14];
                    user = _a[_i];
                    _k.label = 8;
                case 8:
                    _k.trys.push([8, 10, , 11]);
                    if (!broadcastActive || (text && successCount >= parseInt(text))) {
                        broadcastActive = true;
                        return [3 /*break*/, 14];
                    }
                    return [4 /*yield*/, ctx.telegram.copyMessage(user, ctx.chat.id, referencedMessage.message_id)];
                case 9:
                    _k.sent();
                    successCount++;
                    return [3 /*break*/, 11];
                case 10:
                    error_2 = _k.sent();
                    console.error("Failed to send message to user ".concat(user, ":"), error_2);
                    return [3 /*break*/, 11];
                case 11: return [4 /*yield*/, delay(50, 60)];
                case 12:
                    _k.sent();
                    _k.label = 13;
                case 13:
                    _i++;
                    return [3 /*break*/, 7];
                case 14: return [3 /*break*/, 23];
                case 15:
                    if (!text) return [3 /*break*/, 23];
                    _b = 0, _c = users;
                    _k.label = 16;
                case 16:
                    if (!(_b < _c.length)) return [3 /*break*/, 23];
                    user = _c[_b];
                    _k.label = 17;
                case 17:
                    _k.trys.push([17, 19, , 20]);
                    if (!broadcastActive || successCount >= 100)
                        return [3 /*break*/, 23];
                    return [4 /*yield*/, ctx.telegram.sendMessage(user, text)];
                case 18:
                    _k.sent();
                    successCount++;
                    return [3 /*break*/, 20];
                case 19:
                    error_3 = _k.sent();
                    console.error("Failed to send message to user ".concat(user, ":"), error_3);
                    return [3 /*break*/, 20];
                case 20: return [4 /*yield*/, delay(500, 600)];
                case 21:
                    _k.sent();
                    _k.label = 22;
                case 22:
                    _b++;
                    return [3 /*break*/, 16];
                case 23:
                    ctx.reply("Message broadcasted to ".concat(successCount, " users."));
                    return [3 /*break*/, 25];
                case 24:
                    error_4 = _k.sent();
                    console.error("Error broadcasting message:", error_4);
                    ctx.reply("Failed to broadcast message.");
                    return [3 /*break*/, 25];
                case 25: return [2 /*return*/];
            }
        });
    });
}
