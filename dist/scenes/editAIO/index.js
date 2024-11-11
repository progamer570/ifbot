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
import { Scenes, Composer } from "telegraf";
import database from "../../services/database.js";
import env from "../../services/env.js";
import { makeAIOCaption } from "../../utils/caption/makeCaption.js";
import getRandomId from "../../extra/getRandomId.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import * as keyboard from "../../utils/markupButton/permanantButton/keyboard.js";
import telegram from "../../services/telegram.js";
import { sendToLogGroup } from "../../utils/sendToCollection.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
// Create a Wizard Scene
var editDeleteWizard = new Scenes.WizardScene("editAIO", Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var request, searchCriteria, finalResult, random, photo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!("text" in ctx.message)) return [3 /*break*/, 6];
                ctx.session.done = false;
                ctx.session.messageIds = [];
                ctx.session.page = 0;
                request = ctx.message.text.replace("/edit", "").trim();
                searchCriteria = {
                    aIOTitle: request,
                };
                return [4 /*yield*/, database.searchAIO(searchCriteria)];
            case 1:
                finalResult = _a.sent();
                random = getRandomId();
                ctx.session.prev = "prev".concat(random);
                ctx.session.next = "next".concat(random);
                console.log(ctx.session.prev);
                ctx.session.aIOData = finalResult;
                if (!(finalResult && finalResult.length > 0)) return [3 /*break*/, 3];
                photo = finalResult[0].aIOPosterID;
                return [4 /*yield*/, ctx.replyWithPhoto(photo, {
                        caption: "```Json\n{".concat(makeAIOCaption(finalResult[0]), "}\n```"),
                        reply_markup: keyboard.makeAdminButtons("https://t.me/".concat(env.botUserName, "?start=").concat(finalResult[0].shareId, "-a"), ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                        reply_to_message_id: ctx.message.message_id,
                    })];
            case 2:
                _a.sent();
                ctx.session.selectedShareId = finalResult[0].shareId;
                if (finalResult.length > 1) {
                    return [2 /*return*/, ctx.wizard.next()];
                }
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, ctx.reply("".concat(ctx.from.first_name, " your ").concat(request, " not found "))];
            case 4:
                _a.sent();
                ctx.scene.leave;
                _a.label = 5;
            case 5: return [2 /*return*/, ctx.wizard.next()];
            case 6: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var page, AIOData, photo, photo;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!("data" in ctx.callbackQuery &&
                    (ctx.session.next === ctx.callbackQuery.data ||
                        ctx.session.prev === ctx.callbackQuery.data ||
                        ctx.callbackQuery.data === "edit" ||
                        ctx.callbackQuery.data === "delete"))) return [3 /*break*/, 20];
                page = ctx.session.page || 0;
                AIOData = ctx.session.aIOData;
                console.log([
                    ctx.session.page || 0,
                    (_a = ctx.session.aIOData) === null || _a === void 0 ? void 0 : _a.length,
                ]);
                if (!AIOData) return [3 /*break*/, 17];
                if (!ctx.callbackQuery.data.startsWith("next")) return [3 /*break*/, 6];
                if (!(page + 1 < AIOData.length)) return [3 /*break*/, 3];
                ctx.session.page =
                    ((_b = ctx.session.page) !== null && _b !== void 0 ? _b : 0) + 1;
                console.log(page, AIOData.length);
                photo = AIOData[ctx.session.page || 0].aIOPosterID;
                //edit
                return [4 /*yield*/, ctx.editMessageMedia({
                        type: "photo",
                        media: photo,
                    })];
            case 1:
                //edit
                _d.sent();
                return [4 /*yield*/, ctx.editMessageCaption("```Json\n{".concat(makeAIOCaption(AIOData[page + 1]), "}\n```"), {
                        reply_markup: keyboard.makeAdminButtons("https://t.me/".concat(env.botUserName, "?start=").concat(AIOData[page + 1].shareId, "-a"), ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                    })];
            case 2:
                _d.sent();
                ctx.session.selectedShareId = AIOData[page + 1].shareId;
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "This is the last no more there !! ")];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5: return [3 /*break*/, 16];
            case 6:
                if (!ctx.callbackQuery.data.startsWith("prev")) return [3 /*break*/, 12];
                if (!(AIOData && page != 0)) return [3 /*break*/, 9];
                //ignore this page != 0
                ctx.session.page = Math.max(((_c = ctx.session.page) !== null && _c !== void 0 ? _c : 0) - 1, 0);
                photo = AIOData[page - 1].aIOPosterID;
                return [4 /*yield*/, ctx.editMessageMedia({
                        type: "photo",
                        media: photo,
                    })];
            case 7:
                _d.sent();
                return [4 /*yield*/, ctx.editMessageCaption("```Json\n {".concat(makeAIOCaption(AIOData[page - 1]), "}\n```"), {
                        reply_markup: keyboard.makeAdminButtons("https://t.me/".concat(env.botUserName, "?start=").concat(AIOData[page - 1].shareId, "-a"), ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                    })];
            case 8:
                _d.sent();
                ctx.session.selectedShareId = AIOData[page - 1].shareId;
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "Nothing in Prev !! ")];
            case 10:
                _d.sent();
                _d.label = 11;
            case 11: return [3 /*break*/, 16];
            case 12:
                if (!ctx.callbackQuery.data.startsWith("delete")) return [3 /*break*/, 14];
                ctx.session.editDelete = "delete";
                return [4 /*yield*/, ctx.reply("are you sure you want to delete this", {
                        reply_markup: {
                            inline_keyboard: [[{ text: "yes delete", callback_data: "delete" }]],
                        },
                    })];
            case 13:
                _d.sent();
                return [2 /*return*/, ctx.wizard.next()];
            case 14:
                if (!ctx.callbackQuery.data.startsWith("edit")) return [3 /*break*/, 16];
                ctx.session.editDelete = "edit";
                return [4 /*yield*/, ctx.reply("What you want to edit in this AIO", {
                        reply_markup: keyboard.editAIOButtons(),
                    })];
            case 15:
                _d.sent();
                return [2 /*return*/, ctx.wizard.next()];
            case 16: return [3 /*break*/, 19];
            case 17: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "No more data there !!!")];
            case 18:
                _d.sent();
                _d.label = 19;
            case 19: return [3 /*break*/, 22];
            case 20: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "you need to search again this AIO !!!")];
            case 21:
                _d.sent();
                _d.label = 22;
            case 22: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var selectedShareId, message, username, firstName, userId, _a;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                selectedShareId = ctx.session.selectedShareId || 0;
                if (!("data" in ctx.callbackQuery)) return [3 /*break*/, 16];
                if (!ctx.callbackQuery.data.startsWith("caption")) return [3 /*break*/, 2];
                ctx.session.tracker = "caption";
                return [4 /*yield*/, ctx.reply("enter the name AIO ")];
            case 1:
                _e.sent();
                return [2 /*return*/, ctx.wizard.next()];
            case 2:
                if (!ctx.callbackQuery.data.startsWith("poster")) return [3 /*break*/, 4];
                ctx.session.tracker = "poster";
                return [4 /*yield*/, ctx.reply("Send a poster of this AIO")];
            case 3:
                _e.sent();
                return [2 /*return*/, ctx.wizard.next()];
            case 4:
                if (!ctx.callbackQuery.data.startsWith("add")) return [3 /*break*/, 6];
                ctx.session.tracker = "add";
                return [4 /*yield*/, ctx.reply("send me file that you want to add")];
            case 5:
                _e.sent();
                return [2 /*return*/, ctx.wizard.next()];
            case 6:
                if (!ctx.callbackQuery.data.startsWith("delete")) return [3 /*break*/, 16];
                return [4 /*yield*/, ctx.editMessageText("deleting ...")];
            case 7:
                _e.sent();
                return [4 /*yield*/, database.deleteAIO(selectedShareId)];
            case 8:
                _e.sent();
                return [4 /*yield*/, ctx.editMessageText("deleted successfully")];
            case 9:
                _e.sent();
                return [4 /*yield*/, ctx.editMessageReplyMarkup({
                        inline_keyboard: [[{ text: "deleted", callback_data: "delete" }]],
                    })];
            case 10:
                _e.sent();
                _e.label = 11;
            case 11:
                _e.trys.push([11, 13, , 14]);
                message = void 0;
                username = (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username;
                firstName = ((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.first_name) || "USER";
                userId = (_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id;
                if (username) {
                    message = "Deleted AIO ".concat(selectedShareId, " by [").concat(firstName, ": ").concat(userId, "](https://t.me/").concat(username, ")");
                }
                else {
                    message = "Deleted AIO ".concat(selectedShareId, " by [").concat(firstName, ": ").concat(userId, "](tg://user?id=").concat(userId, ")");
                }
                return [4 /*yield*/, sendToLogGroup(env.logGroupId, message)];
            case 12:
                _e.sent();
                return [3 /*break*/, 14];
            case 13:
                _a = _e.sent();
                return [3 /*break*/, 14];
            case 14: return [4 /*yield*/, ctx.scene.leave()];
            case 15: return [2 /*return*/, _e.sent()];
            case 16: return [2 /*return*/];
        }
    });
}); }), Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var selectedShareId, tracker, user, _a, photoFileId, user, _b, text, _c, messageIds, captions, forwardedMessageIds, user, _d, caption;
    var _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                selectedShareId = ctx.session.selectedShareId || 0;
                tracker = ctx.session.tracker || "";
                if (!(tracker.startsWith("caption") && ctx.message && "text" in ctx.message)) return [3 /*break*/, 8];
                return [4 /*yield*/, database.updateAIOAttribute(selectedShareId, {
                        aIOTitle: ctx.message.text,
                    })];
            case 1:
                _k.sent();
                return [4 /*yield*/, ctx.reply("edited")];
            case 2:
                _k.sent();
                _k.label = 3;
            case 3:
                _k.trys.push([3, 5, , 6]);
                user = {
                    id: ctx.from.id,
                    firstname: ctx.from.first_name,
                    username: ctx.from.username,
                };
                return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("Edited AIO Caption ".concat(selectedShareId, " by  "), user))];
            case 4:
                _k.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = _k.sent();
                return [3 /*break*/, 6];
            case 6: return [4 /*yield*/, ctx.scene.leave()];
            case 7: return [2 /*return*/, _k.sent()];
            case 8:
                if (!(tracker.startsWith("poster") && ctx.message && "photo" in ctx.message)) return [3 /*break*/, 17];
                if (!(ctx.message && "photo" in ctx.message)) return [3 /*break*/, 15];
                photoFileId = ctx.message.photo[0].file_id;
                return [4 /*yield*/, database.updateAIOAttribute(selectedShareId, {
                        AIOPosterID: photoFileId,
                    })];
            case 9:
                _k.sent();
                _k.label = 10;
            case 10:
                _k.trys.push([10, 12, , 13]);
                user = {
                    id: ctx.from.id,
                    firstname: ctx.from.first_name,
                    username: ctx.from.username,
                };
                return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("Edited AIO Poster ".concat(selectedShareId, " by  ").concat(selectedShareId, " by "), user))];
            case 11:
                _k.sent();
                return [3 /*break*/, 13];
            case 12:
                _b = _k.sent();
                return [3 /*break*/, 13];
            case 13: return [4 /*yield*/, ctx.reply("edited")];
            case 14:
                _k.sent();
                _k.label = 15;
            case 15: return [4 /*yield*/, ctx.scene.leave()];
            case 16: return [2 /*return*/, _k.sent()];
            case 17:
                if (!tracker.startsWith("add")) return [3 /*break*/, 32];
                if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 20];
                return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /editD")];
            case 18:
                _k.sent();
                return [4 /*yield*/, ctx.scene.leave()];
            case 19: return [2 /*return*/, _k.sent()];
            case 20:
                if (!ctx.message) return [3 /*break*/, 31];
                text = "text" in ctx.message ? ctx.message.text : "";
                if (!(text.toLowerCase() === "done" && !ctx.session.done)) return [3 /*break*/, 29];
                _c = ctx.session, messageIds = _c.messageIds, captions = _c.captions;
                return [4 /*yield*/, ctx.reply("```AIO details and file received.\n \uD83C\uDF89```", {
                        parse_mode: "MarkdownV2",
                    })];
            case 21:
                _k.sent();
                ctx.session.done = true;
                return [4 /*yield*/, telegram.forwardMessages(env.dbAIOChannelId, (_e = ctx.chat) === null || _e === void 0 ? void 0 : _e.id, messageIds ? messageIds : [], false, captions)];
            case 22:
                forwardedMessageIds = _k.sent();
                return [4 /*yield*/, database.addAIO(selectedShareId, forwardedMessageIds)];
            case 23:
                _k.sent();
                _k.label = 24;
            case 24:
                _k.trys.push([24, 26, , 27]);
                user = {
                    id: ctx.from.id,
                    firstname: ctx.from.first_name,
                    username: ctx.from.username,
                };
                return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("Added eps To AIO ".concat(selectedShareId, " by "), user))];
            case 25:
                _k.sent();
                return [3 /*break*/, 27];
            case 26:
                _d = _k.sent();
                return [3 /*break*/, 27];
            case 27: return [4 /*yield*/, ctx.scene.leave()];
            case 28: return [2 /*return*/, _k.sent()];
            case 29: return [4 /*yield*/, ctx.reply("Send next file if Done Click Done ".concat((_f = ctx.session.messageIds) === null || _f === void 0 ? void 0 : _f.length), keyboard.oneTimeDoneKeyboard())];
            case 30:
                _k.sent();
                (_g = ctx.session.messageIds) === null || _g === void 0 ? void 0 : _g.push(ctx.message.message_id);
                caption = getRandomId().toString();
                if ("caption" in ctx.message) {
                    caption = ctx.message.caption || "I_F";
                    ctx.session.captions =
                        ctx.session.captions || [];
                    (_h = ctx.session.captions) === null || _h === void 0 ? void 0 : _h.push(caption);
                }
                else {
                    caption = "I_F";
                    ctx.session.captions =
                        ctx.session.captions || [];
                    (_j = ctx.session.captions) === null || _j === void 0 ? void 0 : _j.push(caption);
                }
                _k.label = 31;
            case 31: return [3 /*break*/, 34];
            case 32:
                ctx.reply("somthing went wrong try again");
                return [4 /*yield*/, ctx.scene.leave()];
            case 33: return [2 /*return*/, _k.sent()];
            case 34: return [2 /*return*/];
        }
    });
}); }));
export default editDeleteWizard;
