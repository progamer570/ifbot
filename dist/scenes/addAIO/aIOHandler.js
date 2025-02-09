var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { sendToCOllection, sendToLogGroup } from "../../utils/sendToCollection.js";
import getRandomId from "../../extra/getRandomId.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
import { processCaptionForStore } from "../../utils/caption/editCaption.js";
import { getPhotoUrl } from "../../utils/getPhotoUrl.js";
import { addToWebsite } from "../../services/toWebsite.js";
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
        var photoFileId, file_id, webPhotoUrl;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /add")];
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
        var text, _a, backupChannel, messageIds, aIOPosterID, captions, _b, aIOTitle, webPhotoUrl, photoUrl, AIODetails, forwardedMessageIds, AIOData, shareId, link, botUsername, _c, _d, error_1, error_2, error_3, user, _e, error_4, caption;
        var _f, _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /add")];
                case 1:
                    _o.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _o.sent()];
                case 3:
                    if (!ctx.message) return [3 /*break*/, 44];
                    text = "text" in ctx.message ? ctx.message.text : "";
                    if (!(text.toLowerCase() === "done" && !ctx.session.done)) return [3 /*break*/, 42];
                    _a = ctx.session, backupChannel = _a.backupChannel, messageIds = _a.messageIds, aIOPosterID = _a.aIOPosterID, captions = _a.captions;
                    _b = ctx.session, aIOTitle = _b.aIOTitle, webPhotoUrl = _b.webPhotoUrl;
                    return [4 /*yield*/, getPhotoUrl(aIOPosterID)];
                case 4:
                    photoUrl = _o.sent();
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
                    _o.sent();
                    ctx.session.done = true;
                    return [4 /*yield*/, telegram.forwardMessages(env.dbAIOChannelId, (_f = ctx.chat) === null || _f === void 0 ? void 0 : _f.id, AIODetails.messageIds ? AIODetails.messageIds : [], false, captions)];
                case 6:
                    forwardedMessageIds = _o.sent();
                    _o.label = 7;
                case 7:
                    _o.trys.push([7, 39, , 41]);
                    return [4 /*yield*/, getAIOdata(AIODetails, forwardedMessageIds)];
                case 8:
                    AIOData = _o.sent();
                    shareId = void 0;
                    link = void 0;
                    botUsername = ctx.botInfo.username;
                    if (!ctx.session.isHindi) return [3 /*break*/, 12];
                    if (!AIOData) return [3 /*break*/, 10];
                    return [4 /*yield*/, database.saveHindiDrama(AIOData)];
                case 9:
                    _c = _o.sent();
                    return [3 /*break*/, 11];
                case 10:
                    _c = null;
                    _o.label = 11;
                case 11:
                    shareId = _c;
                    link = shareId ? "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-hindi") : null;
                    return [3 /*break*/, 16];
                case 12:
                    if (!AIOData) return [3 /*break*/, 14];
                    return [4 /*yield*/, database.saveAIO(AIOData)];
                case 13:
                    _d = _o.sent();
                    return [3 /*break*/, 15];
                case 14:
                    _d = null;
                    _o.label = 15;
                case 15:
                    shareId = _d;
                    link = shareId ? "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-eng") : null;
                    _o.label = 16;
                case 16:
                    if (!(!AIOData || !shareId || !link || !webPhotoUrl)) return [3 /*break*/, 19];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /add")];
                case 17:
                    _o.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 18: return [2 /*return*/, _o.sent()];
                case 19: return [4 /*yield*/, ctx.reply(link + " " + AIOData.aioShortUrl)];
                case 20:
                    _o.sent();
                    _o.label = 21;
                case 21:
                    _o.trys.push([21, 33, , 34]);
                    if (!ctx.session.isHindi) return [3 /*break*/, 27];
                    return [4 /*yield*/, sendToCOllection(env.collectionHindi, AIOData.aIOPosterID, link, AIOData.aIOTitle || "none")];
                case 22:
                    _o.sent();
                    _o.label = 23;
                case 23:
                    _o.trys.push([23, 25, , 26]);
                    return [4 /*yield*/, addToWebsite(webPhotoUrl.replace("".concat(env.token), "token"), __assign(__assign({}, AIOData), { isHindi: true }))];
                case 24:
                    _o.sent();
                    return [3 /*break*/, 26];
                case 25:
                    error_1 = _o.sent();
                    console.error("Error sending to website (Hindi):", error_1);
                    return [3 /*break*/, 26];
                case 26: return [3 /*break*/, 32];
                case 27: return [4 /*yield*/, Promise.all([
                        sendToCOllection(env.collectionAIO, aIOPosterID, link, aIOTitle || "none"),
                        sendToCOllection(env.collectionAIOBackup, aIOPosterID, link, aIOTitle || "none"),
                    ])];
                case 28:
                    _o.sent();
                    _o.label = 29;
                case 29:
                    _o.trys.push([29, 31, , 32]);
                    return [4 /*yield*/, addToWebsite(webPhotoUrl.replace("".concat(env.token), "token"), __assign(__assign({}, AIOData), { isHindi: false }))];
                case 30:
                    _o.sent();
                    return [3 /*break*/, 32];
                case 31:
                    error_2 = _o.sent();
                    console.error("Error sending to website (AIO):", error_2);
                    return [3 /*break*/, 32];
                case 32: return [3 /*break*/, 34];
                case 33:
                    error_3 = _o.sent();
                    console.error("Error processing AIO content:", error_3);
                    return [3 /*break*/, 34];
                case 34:
                    _o.trys.push([34, 36, , 37]);
                    user = {
                        id: ctx.from.id,
                        firstname: ctx.from.first_name,
                        username: ctx.from.username,
                    };
                    return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("".concat(processCaptionForStore(((_g = AIODetails.aIOTitle) === null || _g === void 0 ? void 0 : _g.slice(0, 40)) || "none"), " added by ..."), user))];
                case 35:
                    _o.sent();
                    return [3 /*break*/, 37];
                case 36:
                    _e = _o.sent();
                    return [3 /*break*/, 37];
                case 37: return [4 /*yield*/, ctx.scene.leave()];
                case 38: return [2 /*return*/, _o.sent()];
                case 39:
                    error_4 = _o.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 40: return [2 /*return*/, _o.sent()];
                case 41: return [3 /*break*/, 44];
                case 42: return [4 /*yield*/, ctx.reply("Send next file if Done Click Done ".concat((_h = ctx.session.messageIds) === null || _h === void 0 ? void 0 : _h.length), keyboard.oneTimeDoneKeyboard())];
                case 43:
                    _o.sent();
                    (_j = ctx.session.messageIds) === null || _j === void 0 ? void 0 : _j.push(ctx.message.message_id);
                    caption = getRandomId().toString();
                    if ("document" in ctx.message && ctx.message.document.file_name) {
                        caption = ctx.message.document.file_name;
                        ctx.session.captions = ctx.session.captions || [];
                        (_k = ctx.session.captions) === null || _k === void 0 ? void 0 : _k.push(caption);
                    }
                    else if ("caption" in ctx.message) {
                        caption = ctx.message.caption || " ";
                        ctx.session.captions = ctx.session.captions || [];
                        (_l = ctx.session.captions) === null || _l === void 0 ? void 0 : _l.push(caption);
                    }
                    else {
                        caption = "no caption";
                        ctx.session.captions = ctx.session.captions || [];
                        (_m = ctx.session.captions) === null || _m === void 0 ? void 0 : _m.push(caption);
                    }
                    _o.label = 44;
                case 44: return [2 /*return*/];
            }
        });
    });
}
export { askTitleAIO, handleTitleAskPoster, done, handlePosterAskRelatedMsg };
