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
import { Scenes, Composer } from "telegraf";
import database from "../../services/database.js";
import env from "../../services/env.js";
import { makeAIOCaption } from "../../utils/caption/makeCaption.js";
import getRandomId from "../../extra/getRandomId.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import { makeButtons } from "../../utils/markupButton/permanantButton/keyboard.js";
import { reservedWordList } from "../../utils/markupButton/permanantButton/lists.js";
import { cleanString } from "./cleanReq.js";
import logger from "../../utils/logger.js";
// Create a Wizard Scene
var paginationWizard = new Scenes.WizardScene("reqAIO", Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var request, finalResult, searchCriteria, searchCriteria_1, random, photo, link, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!("text" in ctx.message)) return [3 /*break*/, 13];
                ctx.session.page = 0;
                ctx.session.hindi = false;
                request = ctx.message.text.trim();
                finalResult = void 0;
                searchCriteria = void 0;
                if (!(request.startsWith("/h") || ((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id) === -1002180074673)) return [3 /*break*/, 2];
                ctx.session.hindi = true;
                request = request.replace("/h", "").trim();
                searchCriteria = {
                    aIOTitle: cleanString(request.toLocaleLowerCase()),
                };
                return [4 /*yield*/, database.searchHindiDrama(searchCriteria)];
            case 1:
                finalResult = _b.sent();
                return [3 /*break*/, 4];
            case 2:
                request = request.replace("/s", "").trim();
                searchCriteria = {
                    aIOTitle: cleanString(request.toLocaleLowerCase()),
                };
                return [4 /*yield*/, database.searchAIO(searchCriteria)];
            case 3:
                finalResult = _b.sent();
                _b.label = 4;
            case 4:
                if (!(!reservedWordList.includes(request.toLowerCase()) && request.length > 2)) return [3 /*break*/, 11];
                searchCriteria_1 = {
                    aIOTitle: cleanString(request.toLocaleLowerCase()),
                };
                random = getRandomId();
                ctx.session.prev = "prev".concat(random);
                ctx.session.next = "next".concat(random);
                logger.debug("Previous page data:", ctx.session.prev);
                ctx.session.aIOData = finalResult;
                if (!(finalResult && finalResult.length > 0)) return [3 /*break*/, 9];
                photo = finalResult[0].aIOPosterID;
                link = void 0;
                if (!ctx.session.hindi) {
                    link = "https://t.me/".concat(env.botUserName, "?start=").concat(finalResult[0].shareId, "-eng");
                }
                else if (ctx.session.hindi) {
                    link = "https://t.me/".concat(env.botUserName, "?start=").concat(finalResult[0].shareId, "-hindi");
                }
                else {
                    link = "https://t.me/".concat(env.botUserName, "?start=").concat(finalResult[0].shareId, "-eng");
                }
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, ctx
                        .replyWithPhoto(photo, {
                        caption: "```\n".concat(makeAIOCaption(finalResult[0]), "\n```"),
                        reply_markup: makeButtons(link, ctx.session.next || "", ctx.session.prev || ""),
                        reply_parameters: {
                            message_id: ctx.message.message_id,
                        },
                        parse_mode: "MarkdownV2",
                    })
                        .then(function (sentMessage) {
                        var messageIdToDelete = sentMessage.message_id;
                        setTimeout(function () {
                            ctx.deleteMessage(messageIdToDelete);
                        }, 5 * 60 * 1000);
                    })];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                logger.error("Error replying with photo:", error_1);
                return [3 /*break*/, 8];
            case 8:
                if (finalResult.length > 1) {
                    return [2 /*return*/, ctx.wizard.next()];
                }
                return [3 /*break*/, 10];
            case 9:
                ctx.scene.leave;
                _b.label = 10;
            case 10: return [2 /*return*/, ctx.wizard.next()];
            case 11: return [4 /*yield*/, ctx.scene.leave()];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var page, aIOData, photo, link, photo, link, error_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!("data" in ctx.callbackQuery &&
                    (ctx.session.next === ctx.callbackQuery.data ||
                        ctx.session.prev === ctx.callbackQuery.data))) return [3 /*break*/, 18];
                page = ctx.session.page || 0;
                aIOData = ctx.session.aIOData;
                logger.debug("Current page and AIO data length:", ctx.session.page || 0, (_a = ctx.session.aIOData) === null || _a === void 0 ? void 0 : _a.length);
                if (!aIOData) return [3 /*break*/, 15];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 13, , 14]);
                if (!ctx.callbackQuery.data.startsWith("next")) return [3 /*break*/, 7];
                if (!(page + 1 < aIOData.length)) return [3 /*break*/, 4];
                ctx.session.page =
                    ((_b = ctx.session.page) !== null && _b !== void 0 ? _b : 0) + 1;
                logger.debug("Page and AIO data length (next):");
                photo = aIOData[ctx.session.page || 0].aIOPosterID;
                //edit
                return [4 /*yield*/, ctx.editMessageMedia({
                        type: "photo",
                        media: photo,
                    })];
            case 2:
                //edit
                _d.sent();
                link = void 0;
                if (aIOData[page + 1].aioShortUrl === "null") {
                    link = "https://t.me/".concat(env.botUserName, "?start=").concat(aIOData[page + 1].shareId, "-eng");
                }
                else {
                    // link = aIOData[page + 1].aioShortUrl;
                    link = "https://t.me/".concat(env.botUserName, "?start=").concat(aIOData[page + 1].shareId, "-eng");
                }
                return [4 /*yield*/, ctx.editMessageCaption("```\n".concat(makeAIOCaption(aIOData[page + 1]), "\n```"), {
                        reply_markup: makeButtons(link, ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                    })];
            case 3:
                _d.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "This is the last no more there !! ")];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6: return [3 /*break*/, 12];
            case 7:
                if (!ctx.callbackQuery.data.startsWith("prev")) return [3 /*break*/, 12];
                if (!(aIOData && page != 0)) return [3 /*break*/, 10];
                //ignore this page != 0
                ctx.session.page = Math.max(((_c = ctx.session.page) !== null && _c !== void 0 ? _c : 0) - 1, 0);
                photo = aIOData[page - 1].aIOPosterID;
                link = void 0;
                if (aIOData[page - 1].aioShortUrl === "null") {
                    link = "https://t.me/".concat(env.botUserName, "?start=").concat(aIOData[page - 1].shareId, "-eng");
                }
                else {
                    // link = aIOData[page - 1].aioShortUrl;
                    link = "https://t.me/".concat(env.botUserName, "?start=").concat(aIOData[page - 1].shareId, "-eng");
                }
                return [4 /*yield*/, ctx.editMessageMedia({
                        type: "photo",
                        media: photo,
                    })];
            case 8:
                _d.sent();
                return [4 /*yield*/, ctx.editMessageCaption("```\n ".concat(makeAIOCaption(aIOData[page - 1]), "\n```"), {
                        reply_markup: makeButtons(link, ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                    })];
            case 9:
                _d.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "Nothing in Prev !! ")];
            case 11:
                _d.sent();
                _d.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                error_2 = _d.sent();
                logger.error("Error handling pagination callback:", error_2);
                return [3 /*break*/, 14];
            case 14: return [3 /*break*/, 17];
            case 15: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "No more data there !!!")];
            case 16:
                _d.sent();
                _d.label = 17;
            case 17: return [3 /*break*/, 20];
            case 18: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "you need to search again this  !!!")];
            case 19:
                _d.sent();
                _d.label = 20;
            case 20: return [2 /*return*/];
        }
    });
}); }));
export default paginationWizard;
