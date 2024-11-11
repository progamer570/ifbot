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
import { makeAIOCaption } from "../../utils/caption/makeCaption.js";
import getRandomId from "../../extra/getRandomId.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import { makeInviteButtons } from "../../utils/markupButton/permanantButton/keyboard.js";
import { generateInviteLink } from "../../handlers/commands/start.js";
// Create a Wizard Scene
var myInvitePagination = new Scenes.WizardScene("myInvites", Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var myInviteUser, random, invites, batchSize, numberOfBatches, batches, _loop_1, i, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!("text" in ctx.message)) return [3 /*break*/, 6];
                ctx.session.page = 0;
                return [4 /*yield*/, database.getInviteUser(ctx.from.id.toString())];
            case 1:
                myInviteUser = _a.sent();
                if (!myInviteUser) {
                    ctx.reply("Invite atleast 1 users to see your invited user list \nyour invite link is: ".concat(generateInviteLink(ctx.from.id.toString(), false)), {
                        reply_to_message_id: ctx.message.message_id,
                    });
                }
                if (!myInviteUser) return [3 /*break*/, 5];
                ctx.session.id = ctx.from.id.toString();
                ctx.session.totalInvites = myInviteUser.invites.length.toString();
                random = getRandomId();
                invites = myInviteUser.invites;
                batchSize = 40;
                numberOfBatches = Math.ceil(invites.length / batchSize);
                batches = [];
                _loop_1 = function (i) {
                    var batchStartIndex = i * batchSize;
                    var batch = invites.slice(batchStartIndex, batchStartIndex + batchSize);
                    var batchText = batch
                        .map(function (invite, index) {
                        return "".concat(batchStartIndex + index + 1, ". Username : ").concat(invite.userId, "  \n___________________________________");
                    })
                        .join("\n");
                    batches.push("you invited : \n".concat(batchText));
                };
                for (i = 0; i < numberOfBatches; i++) {
                    _loop_1(i);
                }
                ctx.session.inviteData = batches;
                ctx.session.prev = "prev".concat(random);
                ctx.session.next = "next".concat(random);
                console.log(ctx.session.prev);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, ctx
                        .reply("```\n".concat(batches[0] || "You have not invited anyone yet.", "\n```"), {
                        reply_markup: makeInviteButtons(generateInviteLink(ctx.from.id.toString(), true), myInviteUser.invites.length.toString(), ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                        reply_to_message_id: ctx.message.message_id,
                    })
                        .then(function (sentMessage) {
                        try {
                            var messageIdToDelete_1 = sentMessage.message_id;
                            setTimeout(function () {
                                ctx.deleteMessage(messageIdToDelete_1);
                            }, 5 * 60 * 60 * 1000);
                        }
                        catch (_a) { }
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, ctx.wizard.next()];
            case 6: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var page, link, totalInvites, inviteData, error_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!("data" in ctx.callbackQuery &&
                    (ctx.session.next === ctx.callbackQuery.data ||
                        ctx.session.prev === ctx.callbackQuery.data))) return [3 /*break*/, 16];
                page = ctx.session.page || 0;
                link = generateInviteLink(ctx.session.id, true);
                totalInvites = ctx.session.totalInvites;
                inviteData = ctx.session.inviteData;
                console.log([
                    ctx.session.page || 0,
                    (_a = ctx.session.inviteData) === null || _a === void 0 ? void 0 : _a.length,
                ]);
                if (!inviteData) return [3 /*break*/, 13];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 11, , 12]);
                if (!ctx.callbackQuery.data.startsWith("next")) return [3 /*break*/, 6];
                if (!(page + 1 < inviteData.length)) return [3 /*break*/, 3];
                ctx.session.page =
                    ((_b = ctx.session.page) !== null && _b !== void 0 ? _b : 0) + 1;
                console.log(page, inviteData.length);
                return [4 /*yield*/, ctx.editMessageText("```\n".concat(inviteData[page + 1], "\n```"), {
                        reply_markup: makeInviteButtons(link, totalInvites, ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                    })];
            case 2:
                _d.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "This is the last no more there !! ")];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5: return [3 /*break*/, 10];
            case 6:
                if (!ctx.callbackQuery.data.startsWith("prev")) return [3 /*break*/, 10];
                if (!(inviteData && page != 0)) return [3 /*break*/, 8];
                //ignore this page != 0
                ctx.session.page = Math.max(((_c = ctx.session.page) !== null && _c !== void 0 ? _c : 0) - 1, 0);
                return [4 /*yield*/, ctx.editMessageText("```\n ".concat(makeAIOCaption(inviteData[page - 1]), "\n```"), {
                        reply_markup: makeInviteButtons(link, totalInvites, ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                    })];
            case 7:
                _d.sent();
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "Nothing in Prev !! ")];
            case 9:
                _d.sent();
                _d.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_2 = _d.sent();
                return [3 /*break*/, 12];
            case 12: return [3 /*break*/, 15];
            case 13: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "No more data there !!!")];
            case 14:
                _d.sent();
                _d.label = 15;
            case 15: return [3 /*break*/, 18];
            case 16: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "you need to search again this  !!!")];
            case 17:
                _d.sent();
                _d.label = 18;
            case 18: return [2 /*return*/];
        }
    });
}); }));
export default myInvitePagination;
