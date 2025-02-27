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
import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import telegram from "../../services/telegram.js";
import env from "../../services/env.js";
import database from "../../services/database.js";
import getAIOdata from "./ongDocument.js";
import { sendToCollectionOng2, sendToLogGroup, } from "../../utils/sendToCollection.js";
import getRandomId from "../../extra/getRandomId.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
import { processCaptionForStore } from "../../utils/caption/editCaption.js";
import { getPhotoUrl } from "../../utils/getPhotoUrl.js";
import { getUrlFromFileId } from "../../utils/helper.js";
function askTitleAIO(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ctx.session.messageIds = [];
                    ctx.session.captions = [];
                    ctx.session.done = false;
                    ctx.session.isHindi = false;
                    return [4 /*yield*/, ctx.reply("```note\n you can not delete anything \n until the last step from here \n after you can \n cancel anytime say``` /cancel", {
                            parse_mode: "MarkdownV2",
                        })];
                case 1:
                    _a.sent();
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/createong")) return [3 /*break*/, 3];
                    ctx.session.isHindi = true;
                    return [4 /*yield*/, ctx.reply("Send the title of the Hindi drama/movie along with the following details:\n\n- Original Name \n- Also Known As (if applicable) \n- Year \n- Rating \n- Cast (optional) \n- Directors (optional) \n- Genres \n- Episodes (if it\u2019s a drama) \n- Quality (can be 720p, 540p, 1080p, or 480p) \n- Language (must be Hindi; dual languages optional) \n- Synopsis (optional) \n- Subtitles (optional)\n for cancel say /cancel")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, ctx.wizard.next()];
            }
        });
    });
}
function handleTitleAskPoster(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text !== "/cancel")) return [3 /*break*/, 2];
                    ctx.session.aIOTitle = ctx.message.text;
                    (_a = ctx.session.captions) === null || _a === void 0 ? void 0 : _a.push(ctx.message.text);
                    return [4 /*yield*/, ctx.reply("Send me poster that realated to it (a Image Of) ")];
                case 1:
                    _b.sent();
                    return [2 /*return*/, ctx.wizard.next()];
                case 2: return [4 /*yield*/, ctx.scene.leave()];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function handlePosterAskRelatedMsg(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var photoFileId, file_id, webPhotoUrl;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share Creation Canceled start again /createong")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _b.sent()];
                case 3:
                    if (!(ctx.message && "photo" in ctx.message)) return [3 /*break*/, 6];
                    photoFileId = ctx.message.photo[0].file_id;
                    file_id = ctx.message.photo.pop().file_id;
                    return [4 /*yield*/, getUrlFromFileId(file_id)];
                case 4:
                    webPhotoUrl = _b.sent();
                    ctx.session.aIOPosterID = photoFileId;
                    ctx.session.webPhotoUrl = webPhotoUrl;
                    ctx.session.messageIds = ctx.session.messageIds || [];
                    (_a = ctx.session.messageIds) === null || _a === void 0 ? void 0 : _a.push(ctx.message.message_id);
                    return [4 /*yield*/, ctx.reply("Send me files and message that realated to it ")];
                case 5:
                    _b.sent();
                    return [2 /*return*/, ctx.wizard.next()];
                case 6: return [4 /*yield*/, ctx.reply("```Wrong \n  you need to send a image\n```", {
                        parse_mode: "MarkdownV2",
                    })];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function done(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var text, _a, backupChannel, messageIds, aIOPosterID, captions, _b, aIOTitle, webPhotoUrl, photoUrl, AIODetails, forwardedMessageIds_1, AIOData, shareId, link, botUsername, _c, links, error_1, user, _d, error_2, session, caption;
        var _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share Creation Canceled start again /createong")];
                case 1:
                    _h.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _h.sent()];
                case 3:
                    if (!ctx.message) return [3 /*break*/, 29];
                    text = "text" in ctx.message ? ctx.message.text : "";
                    if (!(text.toLowerCase() === "done" && !ctx.session.done)) return [3 /*break*/, 27];
                    _a = ctx.session, backupChannel = _a.backupChannel, messageIds = _a.messageIds, aIOPosterID = _a.aIOPosterID, captions = _a.captions;
                    _b = ctx.session, aIOTitle = _b.aIOTitle, webPhotoUrl = _b.webPhotoUrl;
                    return [4 /*yield*/, getPhotoUrl(aIOPosterID)];
                case 4:
                    photoUrl = _h.sent();
                    AIODetails = {
                        aIOTitle: aIOTitle,
                        backupChannel: backupChannel,
                        messageIds: messageIds,
                        aIOPosterID: photoUrl,
                        captions: captions,
                    };
                    return [4 /*yield*/, ctx.reply("```Creation details and file received.\n".concat(AIODetails.aIOTitle, " \uD83C\uDF89```"), {
                            parse_mode: "MarkdownV2",
                        })];
                case 5:
                    _h.sent();
                    ctx.session.done = true;
                    return [4 /*yield*/, telegram.forwardMessages(env.dbOngoingChannelId, (_e = ctx.chat) === null || _e === void 0 ? void 0 : _e.id, AIODetails.messageIds ? AIODetails.messageIds : [], false, captions)];
                case 6:
                    forwardedMessageIds_1 = _h.sent();
                    _h.label = 7;
                case 7:
                    _h.trys.push([7, 24, , 26]);
                    return [4 /*yield*/, getAIOdata(AIODetails, forwardedMessageIds_1, "ongoing")];
                case 8:
                    AIOData = _h.sent();
                    shareId = void 0;
                    link = void 0;
                    botUsername = ctx.botInfo.username;
                    if (!AIOData) return [3 /*break*/, 10];
                    return [4 /*yield*/, database.createOngoing(AIOData)];
                case 9:
                    _c = _h.sent();
                    return [3 /*break*/, 11];
                case 10:
                    _c = null;
                    _h.label = 11;
                case 11:
                    shareId = _c;
                    link = shareId ? "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-eng") : null;
                    if (!(!AIOData || !shareId || !link || !webPhotoUrl)) return [3 /*break*/, 14];
                    return [4 /*yield*/, ctx.reply("Share Creation Canceled start again /createong")];
                case 12:
                    _h.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 13: return [2 /*return*/, _h.sent()];
                case 14: return [4 /*yield*/, ctx.reply(link)];
                case 15:
                    _h.sent();
                    _h.label = 16;
                case 16:
                    _h.trys.push([16, 18, , 19]);
                    if (!captions || !forwardedMessageIds_1) {
                        console.error("Error: captions or messageIds is undefined");
                        return [2 /*return*/];
                    }
                    links = captions.map(function (caption, index) { return ({
                        caption: caption,
                        messageId: forwardedMessageIds_1[index] || "",
                    }); });
                    return [4 /*yield*/, sendToCollectionOng2(env.collectionOngoing, aIOPosterID, links, shareId ? String(shareId) : undefined)];
                case 17:
                    _h.sent();
                    return [3 /*break*/, 19];
                case 18:
                    error_1 = _h.sent();
                    console.error("Error processing AIO content:", error_1);
                    return [3 /*break*/, 19];
                case 19:
                    _h.trys.push([19, 21, , 22]);
                    user = {
                        id: ctx.from.id,
                        firstname: ctx.from.first_name,
                        username: ctx.from.username,
                    };
                    return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("".concat(processCaptionForStore(((_f = AIODetails.aIOTitle) === null || _f === void 0 ? void 0 : _f.slice(0, 40)) || "none"), " added by ..."), user))];
                case 20:
                    _h.sent();
                    return [3 /*break*/, 22];
                case 21:
                    _d = _h.sent();
                    return [3 /*break*/, 22];
                case 22: return [4 /*yield*/, ctx.scene.leave()];
                case 23: return [2 /*return*/, _h.sent()];
                case 24:
                    error_2 = _h.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 25: return [2 /*return*/, _h.sent()];
                case 26: return [3 /*break*/, 29];
                case 27: return [4 /*yield*/, ctx.reply("Send next file if Done Click Done ".concat((_g = ctx.session.messageIds) === null || _g === void 0 ? void 0 : _g.length), keyboard.oneTimeDoneKeyboard())];
                case 28:
                    _h.sent();
                    session = ctx.session;
                    session.messageIds = session.messageIds || [];
                    session.messageIds.push(ctx.message.message_id);
                    caption = getRandomId().toString();
                    if ("document" in ctx.message && ctx.message.document.file_name) {
                        caption = ctx.message.document.file_name;
                    }
                    else if ("caption" in ctx.message) {
                        caption = ctx.message.caption || " ";
                    }
                    else {
                        caption = "no caption";
                    }
                    session.captions = session.captions || [];
                    session.captions.push(caption);
                    _h.label = 29;
                case 29: return [2 /*return*/];
            }
        });
    });
}
export { askTitleAIO, handleTitleAskPoster, done, handlePosterAskRelatedMsg };
