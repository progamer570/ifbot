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
import env from "../../services/env.js";
import telegram from "../../services/telegram.js";
import { sendDailyLimitMessage, sendInviteMessage, sendInviterWelcomeMessage, sendTokenExpiredMessage, sendTokenGeneratedMessage, } from "../../utils/helper.js";
export default function startHandler(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var chatId, user, userId, payload, shareId, tokenNumber, firstSortItem, activeShareId, token, inviteParts, inviterId, newUserId, isUserExist, parts, chatsUserHasNotJoined, haveBotPremium, isValidToken, firstItem, canRequest, error_1, messageIds, channel, error_2, error_3;
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
                    _a.trys.push([1, 41, , 42]);
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
                    return [4 /*yield*/, sendTokenGeneratedMessage(ctx, token).catch(function (error) { return console.error(error); })];
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
                    return [4 /*yield*/, sendInviterWelcomeMessage(ctx, inviterId).catch(function (error) {
                            return console.error(error);
                        })];
                case 8: return [2 /*return*/, _a.sent()];
                case 9: return [3 /*break*/, 11];
                case 10:
                    parts = payload.split("-");
                    if (parts.length > 0) {
                        shareId = Number(parts[0]);
                    }
                    _a.label = 11;
                case 11:
                    if (!!shareId) return [3 /*break*/, 13];
                    return [4 /*yield*/, sendInviteMessage(ctx, user, userId.toString()).catch(function (error) {
                            return console.error(error);
                        })];
                case 12: return [2 /*return*/, _a.sent()];
                case 13:
                    if (!!auth.isAdmin(userId)) return [3 /*break*/, 15];
                    return [4 /*yield*/, telegram.getChatsUserHasNotJoined(userId)];
                case 14:
                    chatsUserHasNotJoined = _a.sent();
                    if (chatsUserHasNotJoined.length) {
                        return [2 /*return*/, telegram.sendForceJoinMessage(shareId, chatId, user, chatsUserHasNotJoined)];
                    }
                    _a.label = 15;
                case 15: return [4 /*yield*/, database
                        .checkBotPremiumStatus(userId.toString())
                        .catch(function (error) { return console.error(error); })];
                case 16:
                    haveBotPremium = _a.sent();
                    return [4 /*yield*/, database.verifyAndValidateToken(userId.toString())];
                case 17:
                    isValidToken = _a.sent();
                    if (!(!isValidToken || !haveBotPremium)) return [3 /*break*/, 20];
                    return [4 /*yield*/, database.getFirstItem().catch(function (error) { return console.error(error); })];
                case 18:
                    firstItem = _a.sent();
                    if (!firstItem) return [3 /*break*/, 20];
                    return [4 /*yield*/, sendTokenExpiredMessage(ctx, user, firstItem.sort[0].aioShortUrl, payload).catch(function (error) { return console.error(error); })];
                case 19: return [2 /*return*/, _a.sent()];
                case 20: return [4 /*yield*/, database.canRequest(userId.toString())];
                case 21:
                    canRequest = _a.sent();
                    if (!(canRequest || env.adminIds.includes(userId) || haveBotPremium)) return [3 /*break*/, 38];
                    _a.label = 22;
                case 22:
                    _a.trys.push([22, 25, , 26]);
                    if (!!payload.includes("ong")) return [3 /*break*/, 24];
                    return [4 /*yield*/, database.useRequest(userId.toString())];
                case 23:
                    _a.sent();
                    _a.label = 24;
                case 24: return [3 /*break*/, 26];
                case 25:
                    error_1 = _a.sent();
                    console.error("Error updating request count:", error_1);
                    return [3 /*break*/, 26];
                case 26:
                    messageIds = void 0;
                    channel = void 0;
                    if (!payload.includes("eng")) return [3 /*break*/, 28];
                    return [4 /*yield*/, database.getAIOMessages(Number(shareId))];
                case 27:
                    messageIds = _a.sent();
                    channel = env.dbAIOChannelId;
                    return [3 /*break*/, 32];
                case 28:
                    if (!payload.includes("hindi")) return [3 /*break*/, 30];
                    return [4 /*yield*/, database.getHindiMessages(Number(shareId))];
                case 29:
                    messageIds = _a.sent();
                    channel = env.dbAIOChannelId;
                    return [3 /*break*/, 32];
                case 30:
                    if (!payload.includes("ong")) return [3 /*break*/, 32];
                    return [4 /*yield*/, database.getOngoingMessages(Number(shareId))];
                case 31:
                    messageIds = _a.sent();
                    channel = env.dbOngoingChannelId;
                    _a.label = 32;
                case 32:
                    if (!messageIds) {
                        return [2 /*return*/, ctx.reply("Message not found, try another link")];
                    }
                    if (!channel) {
                        throw new Error("Missing DB_CHANNEL_ID or DB_MOVIE_CHANNEL_ID");
                    }
                    return [4 /*yield*/, telegram.forwardMessages(chatId, channel, messageIds, true)];
                case 33:
                    _a.sent();
                    _a.label = 34;
                case 34:
                    _a.trys.push([34, 36, , 37]);
                    return [4 /*yield*/, database.saveUser(user)];
                case 35:
                    _a.sent();
                    return [3 /*break*/, 37];
                case 36:
                    error_2 = _a.sent();
                    console.error("Error saving user data:", error_2);
                    return [3 /*break*/, 37];
                case 37: return [3 /*break*/, 40];
                case 38: return [4 /*yield*/, sendDailyLimitMessage(ctx, user, userId.toString()).catch(function (error) {
                        return console.error(error);
                    })];
                case 39: return [2 /*return*/, _a.sent()];
                case 40: return [3 /*break*/, 42];
                case 41:
                    error_3 = _a.sent();
                    console.error("Error in startHandler:", error_3);
                    return [3 /*break*/, 42];
                case 42: return [2 /*return*/];
            }
        });
    });
}
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
