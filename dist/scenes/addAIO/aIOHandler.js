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
import getAIOdata from "./aIODocument.js";
// import { editCaption } from "../../services/client.js";
import { sendToCOllection, sendToLogGroup } from "../../utils/sendToCollection.js";
import getRandomId from "../../extra/getRandomId.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
import { processCaptionForStore } from "../../utils/caption/editCaption.js";
import { getPhotoUrl } from "../../utils/getPhotoUrl.js";
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
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/addh")) return [3 /*break*/, 3];
                    ctx.session.isHindi = true;
                    return [4 /*yield*/, ctx.reply("Send the title of the Hindi drama/movie along with the following details:\n\n- Original Name \n- Also Known As (if applicable) \n- Year \n- Rating \n- Cast (optional) \n- Directors (optional) \n- Genres \n- Episodes (if it\u2019s a drama) \n- Quality (can be 720p, 540p, 1080p, or 480p) \n- Language (must be Hindi; dual languages optional) \n- Synopsis (optional) \n- Subtitles (optional)\n for cancel say /cancel")];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ctx.reply("Send the title of the Hindi drama/movie along with the following details:\n\n- Original Name\n- Also Known As (if applicable)\n- Year\n- Rating\n- Cast (optional)\n- Directors (optional) \n- Genres \n- Episodes (if it\u2019s a drama) \n- Quality (can be 720p, 540p, 1080p, or 480p) \n- Language (must be Original; dual languages optional) \n- Synopsis (optional) \n- Subtitles (must be English Subtitles; dual Subtitles optional)\n for cancel say /cancel")];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, ctx.wizard.next()];
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
        var photoFileId;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /addaio")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _b.sent()];
                case 3:
                    if (!(ctx.message && "photo" in ctx.message)) return [3 /*break*/, 5];
                    photoFileId = ctx.message.photo[0].file_id;
                    ctx.session.aIOPosterID = photoFileId;
                    ctx.session.messageIds = ctx.session.messageIds || [];
                    (_a = ctx.session.messageIds) === null || _a === void 0 ? void 0 : _a.push(ctx.message.message_id);
                    return [4 /*yield*/, ctx.reply("Send me files and message that realated to it ")];
                case 4:
                    _b.sent();
                    return [2 /*return*/, ctx.wizard.next()];
                case 5: return [4 /*yield*/, ctx.reply("```Wrong \n  you need to send a image\n```", {
                        parse_mode: "MarkdownV2",
                    })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function done(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var text, _a, backupChannel, messageIds, aIOPosterID, captions, aIOTitle, photoUrl, AIODetails, forwardedMessageIds, AIOData, shareId, link, botUsername, _b, _c, error_1, user, _d, error_2, caption;
        var _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /addaio")];
                case 1:
                    _m.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _m.sent()];
                case 3:
                    if (!ctx.message) return [3 /*break*/, 35];
                    text = "text" in ctx.message ? ctx.message.text : "";
                    if (!(text.toLowerCase() === "done" && !ctx.session.done)) return [3 /*break*/, 33];
                    _a = ctx.session, backupChannel = _a.backupChannel, messageIds = _a.messageIds, aIOPosterID = _a.aIOPosterID, captions = _a.captions;
                    aIOTitle = ctx.session.aIOTitle;
                    return [4 /*yield*/, getPhotoUrl(aIOPosterID)];
                case 4:
                    photoUrl = _m.sent();
                    AIODetails = {
                        aIOTitle: aIOTitle,
                        backupChannel: backupChannel,
                        messageIds: messageIds,
                        aIOPosterID: photoUrl,
                        captions: captions,
                    };
                    return [4 /*yield*/, ctx.reply("```AIO details and file received.\n".concat(AIODetails.aIOTitle, " \uD83C\uDF89```"), {
                            parse_mode: "MarkdownV2",
                        })];
                case 5:
                    _m.sent();
                    ctx.session.done = true;
                    return [4 /*yield*/, telegram.forwardMessages(env.dbAIOChannelId, (_e = ctx.chat) === null || _e === void 0 ? void 0 : _e.id, AIODetails.messageIds ? AIODetails.messageIds : [], false, captions)];
                case 6:
                    forwardedMessageIds = _m.sent();
                    _m.label = 7;
                case 7:
                    _m.trys.push([7, 30, , 32]);
                    return [4 /*yield*/, getAIOdata(AIODetails, forwardedMessageIds)];
                case 8:
                    AIOData = _m.sent();
                    shareId = void 0;
                    link = void 0;
                    botUsername = ctx.botInfo.username;
                    if (!ctx.session.isHindi) return [3 /*break*/, 12];
                    if (!AIOData) return [3 /*break*/, 10];
                    return [4 /*yield*/, database.saveHindiDrama(AIOData)];
                case 9:
                    _b = _m.sent();
                    return [3 /*break*/, 11];
                case 10:
                    _b = null;
                    _m.label = 11;
                case 11:
                    shareId = _b;
                    link = shareId ? "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-hindi") : null;
                    return [3 /*break*/, 16];
                case 12:
                    if (!AIOData) return [3 /*break*/, 14];
                    return [4 /*yield*/, database.saveAIO(AIOData)];
                case 13:
                    _c = _m.sent();
                    return [3 /*break*/, 15];
                case 14:
                    _c = null;
                    _m.label = 15;
                case 15:
                    shareId = _c;
                    link = shareId ? "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-eng") : null;
                    _m.label = 16;
                case 16:
                    if (!AIOData || !shareId || !link) {
                        throw new Error("Failed to process the request ");
                    }
                    return [4 /*yield*/, ctx.reply(link + " " + AIOData.aioShortUrl)];
                case 17:
                    _m.sent();
                    if (!ctx.session.isHindi) return [3 /*break*/, 22];
                    _m.label = 18;
                case 18:
                    _m.trys.push([18, 20, , 21]);
                    return [4 /*yield*/, sendToCOllection(env.collectionHindi, AIOData.aIOPosterID, link, AIOData.aIOTitle || "none")];
                case 19:
                    _m.sent();
                    return [3 /*break*/, 21];
                case 20:
                    error_1 = _m.sent();
                    return [3 /*break*/, 21];
                case 21: return [3 /*break*/, 25];
                case 22: return [4 /*yield*/, sendToCOllection(env.collectionAIO, aIOPosterID, link, aIOTitle || "none")];
                case 23:
                    _m.sent();
                    return [4 /*yield*/, sendToCOllection(env.collectionAIOBackup, aIOPosterID, link, aIOTitle || "none")];
                case 24:
                    _m.sent();
                    _m.label = 25;
                case 25:
                    _m.trys.push([25, 27, , 28]);
                    user = {
                        id: ctx.from.id,
                        firstname: ctx.from.first_name,
                        username: ctx.from.username,
                    };
                    return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("".concat(processCaptionForStore(((_f = AIODetails.aIOTitle) === null || _f === void 0 ? void 0 : _f.slice(0, 40)) || "none"), " added by ..."), user))];
                case 26:
                    _m.sent();
                    return [3 /*break*/, 28];
                case 27:
                    _d = _m.sent();
                    return [3 /*break*/, 28];
                case 28: return [4 /*yield*/, ctx.scene.leave()];
                case 29: return [2 /*return*/, _m.sent()];
                case 30:
                    error_2 = _m.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 31: return [2 /*return*/, _m.sent()];
                case 32: return [3 /*break*/, 35];
                case 33: return [4 /*yield*/, ctx.reply("Send next file if Done Click Done ".concat((_g = ctx.session.messageIds) === null || _g === void 0 ? void 0 : _g.length), keyboard.oneTimeDoneKeyboard())];
                case 34:
                    _m.sent();
                    (_h = ctx.session.messageIds) === null || _h === void 0 ? void 0 : _h.push(ctx.message.message_id);
                    caption = getRandomId().toString();
                    if ("document" in ctx.message && ctx.message.document.file_name) {
                        caption = ctx.message.document.file_name;
                        ctx.session.captions = ctx.session.captions || [];
                        (_j = ctx.session.captions) === null || _j === void 0 ? void 0 : _j.push(caption);
                    }
                    else if ("caption" in ctx.message) {
                        caption = ctx.message.caption || " ";
                        ctx.session.captions = ctx.session.captions || [];
                        (_k = ctx.session.captions) === null || _k === void 0 ? void 0 : _k.push(caption);
                    }
                    else {
                        caption = "no caption";
                        ctx.session.captions = ctx.session.captions || [];
                        (_l = ctx.session.captions) === null || _l === void 0 ? void 0 : _l.push(caption);
                    }
                    _m.label = 35;
                case 35: return [2 /*return*/];
            }
        });
    });
}
export { askTitleAIO, handleTitleAskPoster, done, handlePosterAskRelatedMsg };
