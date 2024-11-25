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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
import env from "../../services/env.js";
import telegram from "../../services/telegram.js";
export default function startHandler(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var chatId, user, userId, payload, shareId, tokenNumber, firstSortItem, activeShareId, token, inviteParts, inviterId, newUserId, isUserExist, parts, chatsUserHasNotJoined, isValidToken, firstItem, canRequest, error_1, messageIds, channel, error_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chatId = ctx.chat.id;
                    user = ctx.from;
                    userId = user.id;
                    payload = ctx.message.text.split(" ")[1];
                    shareId = undefined;
                    console.log(payload);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 36, , 37]);
                    if (!(payload && payload.includes("token-"))) return [3 /*break*/, 5];
                    tokenNumber = payload.replace("token-", "");
                    return [4 /*yield*/, database.getFirstSortItem()];
                case 2:
                    firstSortItem = _a.sent();
                    if (!firstSortItem) return [3 /*break*/, 5];
                    activeShareId = firstSortItem.currentActivePath;
                    if (!(tokenNumber === activeShareId)) return [3 /*break*/, 5];
                    return [4 /*yield*/, database.manageToken(userId.toString())];
                case 3:
                    token = (_a.sent()).token;
                    return [4 /*yield*/, ctx.reply("Your New token generated:".concat(token.slice(0, 5), " ...,\nNow click on Try Again button \uD83D\uDC46\uD83D\uDC46!"))];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    if (!payload) return [3 /*break*/, 11];
                    inviteParts = payload.split("-");
                    if (!(payload.includes("invite") && inviteParts.length > 1)) return [3 /*break*/, 10];
                    inviterId = inviteParts[1];
                    newUserId = userId.toString();
                    if (!(newUserId && inviterId && newUserId !== inviterId)) return [3 /*break*/, 9];
                    return [4 /*yield*/, database.isUserExist(newUserId)];
                case 6:
                    isUserExist = _a.sent();
                    if (!!isUserExist) return [3 /*break*/, 9];
                    return [4 /*yield*/, addInviteUser(inviterId, newUserId, user.username || "null")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, ctx.reply("Welcome! You were invited by a user with ID ".concat(inviterId, ".\nJoin our main channel for unlimited movies, dramas, and more. Stay updated with the latest releases and exclusive content.\nClick the link to join and start enjoying now!\n").concat(env.join, "\n\n"))];
                case 8: return [2 /*return*/, _a.sent()];
                case 9: return [3 /*break*/, 11];
                case 10:
                    parts = payload.split("-");
                    if (parts.length > 0) {
                        shareId = Number(parts[0]);
                    }
                    _a.label = 11;
                case 11:
                    // Default message if no shareId is found
                    if (!shareId) {
                        return [2 /*return*/, ctx.reply("Hello ".concat(user.first_name, "!\n").concat(env.request, "\n\n\nInvite your friends! Your invite link is:\n").concat(generateInviteLink(userId.toString(), false)), {
                                reply_to_message_id: ctx.message.message_id,
                                parse_mode: "HTML",
                            })];
                    }
                    if (!!auth.isAdmin(userId)) return [3 /*break*/, 13];
                    return [4 /*yield*/, telegram.getChatsUserHasNotJoined(userId)];
                case 12:
                    chatsUserHasNotJoined = _a.sent();
                    if (chatsUserHasNotJoined.length) {
                        return [2 /*return*/, telegram.sendForceJoinMessage(shareId, chatId, user, chatsUserHasNotJoined)];
                    }
                    _a.label = 13;
                case 13: return [4 /*yield*/, database.verifyAndValidateToken(userId.toString())];
                case 14:
                    isValidToken = _a.sent();
                    if (!!isValidToken) return [3 /*break*/, 17];
                    return [4 /*yield*/, database.getFirstItem()];
                case 15:
                    firstItem = _a.sent();
                    if (!firstItem) return [3 /*break*/, 17];
                    return [4 /*yield*/, ctx.reply("Hello ".concat(user.first_name, ", your token has expired.\nYou can generate a new token once a day. After that, you can make unlimited requests within 24 hours.\nANY PROBLEM CONTACT: [ADMIN](tg://user?id=").concat(env.adminIds[0], ")"), {
                            reply_to_message_id: ctx.message.message_id,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: "Click Me To Generate New Token",
                                            url: firstItem.sort[0].aioShortUrl,
                                        },
                                    ],
                                    [
                                        {
                                            text: "Try Again",
                                            url: "https://t.me/".concat(env.botUserName, "?start=").concat(payload).replace(" ", ""),
                                        },
                                    ],
                                ],
                            },
                            parse_mode: "Markdown",
                        })];
                case 16: return [2 /*return*/, _a.sent()];
                case 17: return [4 /*yield*/, database.canRequest(userId.toString())];
                case 18:
                    canRequest = _a.sent();
                    if (!(canRequest || env.adminIds.includes(userId))) return [3 /*break*/, 34];
                    _a.label = 19;
                case 19:
                    _a.trys.push([19, 21, , 22]);
                    return [4 /*yield*/, database.useRequest(userId.toString())];
                case 20:
                    _a.sent();
                    return [3 /*break*/, 22];
                case 21:
                    error_1 = _a.sent();
                    console.error("Error updating request count:", error_1);
                    return [3 /*break*/, 22];
                case 22:
                    messageIds = void 0;
                    channel = void 0;
                    if (!payload.includes("eng")) return [3 /*break*/, 24];
                    return [4 /*yield*/, database.getAIOMessages(Number(shareId))];
                case 23:
                    messageIds = _a.sent();
                    channel = env.dbAIOChannelId;
                    return [3 /*break*/, 28];
                case 24:
                    if (!payload.includes("hindi")) return [3 /*break*/, 26];
                    return [4 /*yield*/, database.getHindiMessages(Number(shareId))];
                case 25:
                    messageIds = _a.sent();
                    channel = env.dbAIOChannelId;
                    return [3 /*break*/, 28];
                case 26:
                    if (!payload.includes("ong")) return [3 /*break*/, 28];
                    return [4 /*yield*/, database.getOngoingMessages(Number(shareId))];
                case 27:
                    messageIds = _a.sent();
                    channel = env.dbOngoingChannelId;
                    _a.label = 28;
                case 28:
                    if (!messageIds) {
                        return [2 /*return*/, ctx.reply("Message not found, try another link", {
                                reply_to_message_id: ctx.message.message_id,
                            })];
                    }
                    if (!channel) {
                        throw new Error("Missing DB_CHANNEL_ID or DB_MOVIE_CHANNEL_ID");
                    }
                    return [4 /*yield*/, telegram.forwardMessages(chatId, channel, messageIds, true)];
                case 29:
                    _a.sent();
                    _a.label = 30;
                case 30:
                    _a.trys.push([30, 32, , 33]);
                    return [4 /*yield*/, database.saveUser(user)];
                case 31:
                    _a.sent();
                    return [3 /*break*/, 33];
                case 32:
                    error_2 = _a.sent();
                    console.error("Error saving user data:", error_2);
                    return [3 /*break*/, 33];
                case 33: return [3 /*break*/, 35];
                case 34: return [2 /*return*/, ctx.reply("Hello ".concat(user.first_name, "!\nYou can make up to 5 requests per day. Increase your limit by inviting users! Each user adds 1 extra daily request.\nYour invite link is: \"").concat(generateInviteLink(userId.toString(), false), "\""), {
                        reply_to_message_id: ctx.message.message_id,
                        parse_mode: "HTML",
                    })];
                case 35: return [3 /*break*/, 37];
                case 36:
                    error_3 = _a.sent();
                    console.error("Error in startHandler:", error_3);
                    return [3 /*break*/, 37];
                case 37: return [2 /*return*/];
            }
        });
    });
}
export var generateInviteLink = function (userId, sharLink) {
    if (sharLink) {
        return "https://t.me/share/url?url=https://t.me/".concat(env.botUserName, "?start=invite-").concat(userId);
    }
    return "https://t.me/".concat(env.botUserName, "?start=invite-").concat(userId);
};
var addInviteUser = function (inviterId, newUserId, username) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.addInvite(inviterId, newUserId, username)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
