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
import database from "../../services/database.js";
import { sendToCollectionOng2, sendToLogGroup } from "../../utils/sendToCollection.js";
import env from "../../services/env.js";
import getRandomId from "../../extra/getRandomId.js";
import getUserLinkMessage from "../../utils/getUserLinkMessage.js";
function startCopying(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedShareId, _a, msgIds_1, captions, forwardedMessageIds, links, user, _b, caption;
        var _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /addaio")];
                case 1:
                    _h.sent();
                    ctx.session.done = false;
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _h.sent()];
                case 3:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/addong"))) return [3 /*break*/, 5];
                    if (ctx.message.text.split(" ").length !== 2)
                        return [2 /*return*/, ctx.reply("wrong format")];
                    ctx.session.shareId = Number(ctx.message.text.split(" ")[1]);
                    return [4 /*yield*/, ctx.reply("send Files")];
                case 4:
                    _h.sent();
                    return [3 /*break*/, 17];
                case 5:
                    selectedShareId = ctx.session.shareId || 0;
                    if (!(ctx.message &&
                        "text" in ctx.message &&
                        ctx.message.text === "Done" &&
                        !ctx.session.done)) return [3 /*break*/, 15];
                    _a = ctx.session, msgIds_1 = _a.msgIds, captions = _a.captions;
                    return [4 /*yield*/, ctx.reply("```Add on going details and file received.\n \uD83C\uDF89```", {
                            parse_mode: "HTML",
                        })];
                case 6:
                    _h.sent();
                    ctx.session.done = true;
                    return [4 /*yield*/, telegram.forwardMessages(env.dbAIOChannelId, (_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id, msgIds_1 ? msgIds_1 : [], false, captions)];
                case 7:
                    forwardedMessageIds = _h.sent();
                    return [4 /*yield*/, database.addOngoing(selectedShareId, forwardedMessageIds)];
                case 8:
                    _h.sent();
                    _h.label = 9;
                case 9:
                    _h.trys.push([9, 12, , 13]);
                    if (!captions || !msgIds_1) {
                        console.error("Error: captions or messageIds is undefined");
                        return [2 /*return*/];
                    }
                    links = captions.map(function (caption, index) { return ({
                        caption: caption,
                        messageId: msgIds_1[index] || "",
                    }); });
                    return [4 /*yield*/, sendToCollectionOng2(env.collectionAIO, undefined, links)];
                case 10:
                    _h.sent();
                    user = {
                        id: ctx.from.id,
                        firstname: ctx.from.first_name,
                        username: ctx.from.username,
                    };
                    return [4 /*yield*/, sendToLogGroup(env.logGroupId, getUserLinkMessage("Added eps To AIO ".concat(selectedShareId, " by "), user))];
                case 11:
                    _h.sent();
                    return [3 /*break*/, 13];
                case 12:
                    _b = _h.sent();
                    return [3 /*break*/, 13];
                case 13: return [4 /*yield*/, ctx.scene.leave()];
                case 14: return [2 /*return*/, _h.sent()];
                case 15: return [4 /*yield*/, ctx.reply("Send next file if Done Click Done ".concat((_d = ctx.session.msgIds) === null || _d === void 0 ? void 0 : _d.length), keyboard.oneTimeDoneKeyboard())];
                case 16:
                    _h.sent();
                    (_e = ctx.session.msgIds) === null || _e === void 0 ? void 0 : _e.push(ctx.message.message_id);
                    caption = getRandomId().toString();
                    if ("caption" in ctx.message) {
                        caption = ctx.message.caption || "I_F";
                        ctx.session.captions = ctx.session.captions || [];
                        (_f = ctx.session.captions) === null || _f === void 0 ? void 0 : _f.push(caption);
                    }
                    else {
                        caption = "I_F";
                        ctx.session.captions = ctx.session.captions || [];
                        (_g = ctx.session.captions) === null || _g === void 0 ? void 0 : _g.push(caption);
                    }
                    _h.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    });
}
export { startCopying };
