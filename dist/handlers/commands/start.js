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
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var chatId, user, userId, payload, shareId, tokenNumber, firstSortItem, activeShareId, token, inviteParts, inviterId, userId_1, isUserExist, parts, chatsUserHasNotJoined, isValidToken, getFirstItem, messageIds, channel, canRequest, error_1, _c, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    chatId = ctx.chat.id;
                    user = ctx.from;
                    userId = user.id;
                    payload = ctx.message.text.split(" ")[1];
                    shareId = undefined;
                    if (!(payload && payload.includes("token-"))) return [3 /*break*/, 4];
                    tokenNumber = payload.replace("token-", "");
                    return [4 /*yield*/, database.getFirstSortItem()];
                case 1:
                    firstSortItem = _d.sent();
                    if (!(firstSortItem !== null)) return [3 /*break*/, 4];
                    activeShareId = firstSortItem.currentActivePath;
                    if (!(tokenNumber === activeShareId.toString())) return [3 /*break*/, 4];
                    return [4 /*yield*/, database.manageToken(userId.toString())];
                case 2:
                    token = (_d.sent()).token;
                    return [4 /*yield*/, ctx.reply("Your token is: ".concat(token))];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _d.trys.push([4, 34, , 35]);
                    if (!payload) return [3 /*break*/, 10];
                    inviteParts = payload.split("-");
                    if (!(payload.includes("invite") && inviteParts.length > 1)) return [3 /*break*/, 9];
                    inviterId = inviteParts[1];
                    userId_1 = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString();
                    if (!(userId_1 && inviterId && userId_1 !== inviterId)) return [3 /*break*/, 8];
                    return [4 /*yield*/, database.isUserExist(userId_1)];
                case 5:
                    isUserExist = _d.sent();
                    if (!!isUserExist) return [3 /*break*/, 8];
                    return [4 /*yield*/, addInviteUser(inviterId, userId_1, user.username || "null")];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, ctx.reply("Welcome! You were invited by a user with ID ".concat(inviterId, ".\nJoin our main channel for unlimited movies, dramas, and more. Stay updated with the latest releases and exclusive content.\nClick the link to join and start enjoying now!\n").concat(env.join, "\n\n"))];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    parts = payload.split("-");
                    if (parts.length > 0) {
                        shareId = Number(parts[0]);
                    }
                    _d.label = 10;
                case 10:
                    if (!shareId) {
                        return [2 /*return*/, ctx.reply("Hello ".concat(user.first_name, "!\n").concat(env.request, "\n\n\nInvite your friends your invite link is:\n").concat(generateInviteLink(userId.toString(), false)), {
                                reply_to_message_id: ctx.message.message_id,
                                parse_mode: "HTML",
                            })];
                    }
                    if (!!auth.isAdmin(userId)) return [3 /*break*/, 15];
                    return [4 /*yield*/, telegram.getChatsUserHasNotJoined(userId)];
                case 11:
                    chatsUserHasNotJoined = _d.sent();
                    if (chatsUserHasNotJoined.length) {
                        return [2 /*return*/, telegram.sendForceJoinMessage(shareId, chatId, user, chatsUserHasNotJoined)];
                    }
                    return [4 /*yield*/, database.verifyAndValidateToken((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id.toString())];
                case 12:
                    isValidToken = _d.sent();
                    if (!!isValidToken) return [3 /*break*/, 15];
                    return [4 /*yield*/, database.getFirstItem()];
                case 13:
                    getFirstItem = _d.sent();
                    if (!getFirstItem) return [3 /*break*/, 15];
                    return [4 /*yield*/, ctx.reply("Hello ".concat(user.first_name, "!\n "), {
                            reply_to_message_id: ctx.message.message_id,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: "Click Me To Generate New Token",
                                            url: getFirstItem.sort[0].aioShortUrl,
                                        },
                                    ],
                                ],
                            },
                            parse_mode: "Markdown",
                        })];
                case 14:
                    _d.sent();
                    _d.label = 15;
                case 15:
                    messageIds = void 0;
                    channel = void 0;
                    return [4 /*yield*/, database.canRequest(userId.toString())];
                case 16:
                    canRequest = _d.sent();
                    if (!(canRequest || env.adminIds.includes(userId))) return [3 /*break*/, 32];
                    _d.label = 17;
                case 17:
                    _d.trys.push([17, 19, , 20]);
                    return [4 /*yield*/, database.useRequest(userId.toString())];
                case 18:
                    _d.sent();
                    return [3 /*break*/, 20];
                case 19:
                    error_1 = _d.sent();
                    return [3 /*break*/, 20];
                case 20:
                    if (!payload.includes("eng")) return [3 /*break*/, 22];
                    return [4 /*yield*/, database.getAIOMessages(Number(shareId))];
                case 21:
                    messageIds = _d.sent();
                    channel = env.dbAIOChannelId;
                    _d.label = 22;
                case 22:
                    if (!payload.includes("hindi")) return [3 /*break*/, 24];
                    return [4 /*yield*/, database.getHindiMessages(Number(shareId))];
                case 23:
                    messageIds = _d.sent();
                    channel = env.dbAIOChannelId;
                    _d.label = 24;
                case 24:
                    if (!payload.includes("ong")) return [3 /*break*/, 26];
                    return [4 /*yield*/, database.getOngoingMessages(Number(shareId))];
                case 25:
                    messageIds = _d.sent();
                    channel = env.dbOngoingChannelId;
                    _d.label = 26;
                case 26:
                    if (!messageIds) {
                        return [2 /*return*/, ctx.reply("Message not found, try another link", {
                                reply_to_message_id: ctx.message.message_id,
                            })];
                    }
                    if (!channel) {
                        throw Error("There must be DB_CHANNEL_ID and DB_MOVIE_CHANNEL_ID");
                    }
                    return [4 /*yield*/, telegram.forwardMessages(chatId, channel, messageIds, true)];
                case 27:
                    _d.sent();
                    _d.label = 28;
                case 28:
                    _d.trys.push([28, 30, , 31]);
                    return [4 /*yield*/, database.saveUser(user)];
                case 29:
                    _d.sent();
                    return [3 /*break*/, 31];
                case 30:
                    _c = _d.sent();
                    return [3 /*break*/, 31];
                case 31: return [3 /*break*/, 33];
                case 32: return [2 /*return*/, ctx.reply("Hello ".concat(user === null || user === void 0 ? void 0 : user.first_name, "!\n In 1 day, you can only make 5 request. Increase your limit by inviting users. \nIt will increase your request limit by per day per user by 1\n your invite link is: \"").concat(generateInviteLink(userId.toString(), false)), {
                        reply_to_message_id: ctx.message.message_id,
                        parse_mode: "HTML",
                    })];
                case 33: return [3 /*break*/, 35];
                case 34:
                    error_2 = _d.sent();
                    console.log(error_2);
                    return [3 /*break*/, 35];
                case 35: return [2 /*return*/];
            }
        });
    });
}
export var generateInviteLink = function (userId, sharLink) {
    if (sharLink) {
        return "https://t.me/share/url?url=https://t.me/".concat(env.botUserName, "?start=invite-").concat(userId);
        //
    }
    else {
        return "https://t.me/".concat(env.botUserName, "?start=invite-").concat(userId);
    }
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
