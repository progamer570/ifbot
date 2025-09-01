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
import { hasReplyToMessage, isTextMessage } from "../../utils/helper.js";
import logger from "../../utils/logger.js";
export var autoReplyMemory = {};
var cleanupMemory = function () {
    var now = Date.now();
    for (var userId in autoReplyMemory) {
        if (autoReplyMemory[userId].expiry <= now) {
            delete autoReplyMemory[userId];
        }
    }
};
export default function autoReactHandler(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, userName, replyToMessage, replyToUserId, args, duration, match, value, unit, durationMs, _a, error_1;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 18, , 20]);
                    userId = ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id) || 2;
                    if (!!auth.isAdmin(userId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Sorry, you have no permission to do this")];
                case 1:
                    _e.sent();
                    return [2 /*return*/];
                case 2:
                    userName = ((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.username) || ((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.first_name) || "Unknown User";
                    if (!!hasReplyToMessage(ctx.message)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ctx.reply("Please reply to a user message to enable autoreply.")];
                case 3:
                    _e.sent();
                    return [2 /*return*/];
                case 4:
                    replyToMessage = ctx.message.reply_to_message;
                    replyToUserId = replyToMessage.from.id;
                    args = isTextMessage(ctx.message) ? ctx.message.text.split(" ") : null;
                    if (!(!args || args.length < 2)) return [3 /*break*/, 6];
                    return [4 /*yield*/, ctx.reply("Please specify the time duration (e.g., /autoreply 1h).")];
                case 5:
                    _e.sent();
                    return [2 /*return*/];
                case 6:
                    duration = args[1];
                    match = duration.match(/^(\d+)([smhd])$/);
                    if (!!match) return [3 /*break*/, 8];
                    return [4 /*yield*/, ctx.reply("Invalid duration format. Use s (seconds), m (minutes), h (hours), d (days).")];
                case 7:
                    _e.sent();
                    return [2 /*return*/];
                case 8:
                    value = parseInt(match[1], 10);
                    unit = match[2];
                    durationMs = void 0;
                    _a = unit;
                    switch (_a) {
                        case "s": return [3 /*break*/, 9];
                        case "m": return [3 /*break*/, 10];
                        case "h": return [3 /*break*/, 11];
                        case "d": return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 13];
                case 9:
                    durationMs = value * 1000;
                    return [3 /*break*/, 15];
                case 10:
                    durationMs = value * 60 * 1000;
                    return [3 /*break*/, 15];
                case 11:
                    durationMs = value * 60 * 60 * 1000;
                    return [3 /*break*/, 15];
                case 12:
                    durationMs = value * 24 * 60 * 60 * 1000;
                    return [3 /*break*/, 15];
                case 13: return [4 /*yield*/, ctx.reply("Invalid time unit. Use s, m, h, or d.")];
                case 14:
                    _e.sent();
                    return [2 /*return*/];
                case 15:
                    // Cleanup memory and check if it's full
                    cleanupMemory();
                    if (!(Object.keys(autoReplyMemory).length >= 10)) return [3 /*break*/, 17];
                    return [4 /*yield*/, ctx.reply("Memory is full. Please wait for an entry to expire or clear memory.")];
                case 16:
                    _e.sent();
                    return [2 /*return*/];
                case 17:
                    // Store the auto-reply entry in memory
                    autoReplyMemory[replyToUserId] = {
                        userName: userName,
                        expiry: Date.now() + durationMs,
                    };
                    return [3 /*break*/, 20];
                case 18:
                    error_1 = _e.sent();
                    logger.error("Error in autoReactHandler:", error_1);
                    return [4 /*yield*/, ctx.reply("An unexpected error occurred. Please try again later.")];
                case 19:
                    _e.sent();
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
            }
        });
    });
}
