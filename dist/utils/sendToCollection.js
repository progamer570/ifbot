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
import env from "../services/env.js";
import telegram from "./../services/telegram.js";
import { processCaption } from "./caption/editCaption.js";
import { convertToTinySubscript, escapeMarkdownV2 } from "./helper.js";
import * as keyboard from "./markupButton/permanantButton/keyboard.js";
import database from "../services/database.js";
export function sendToCOllection(chat, aIOPosterID, link, caption) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, telegram.app.telegram.sendPhoto(chat, aIOPosterID || "", {
                            caption: "`\n".concat(caption, "\n`"),
                            parse_mode: "Markdown",
                            reply_markup: keyboard.makeCollectionButton(link),
                        })];
                case 1:
                    _a.sent();
                    console.log("Photo sent successfully!");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error sending photo:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function sendToCOllectionOng(chat, link, caption) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, telegram.app.telegram.sendMessage(chat, "```\n".concat(caption, "\n```") || "", {
                            parse_mode: "Markdown",
                            reply_markup: keyboard.makeCollectionButton(link),
                        })];
                case 1:
                    _a.sent();
                    console.log("Photo sent successfully!");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error sending photo:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function sendToCollectionOng2(chat_1, aIOPoster_1, links_1) {
    return __awaiter(this, arguments, void 0, function (chat, aIOPoster, links, shareId) {
        var captionText, shareText, error_3, photo, chunkSize, i, chunk, formattedLinks, messageText, error_4;
        if (shareId === void 0) { shareId = ""; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!aIOPoster) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    captionText = "```\n".concat(links[0].caption, "\n```");
                    shareText = shareId
                        ? "\n[\uD83D\uDD17add ongoing](tg://msg?text=/addong".concat(encodeURIComponent(shareId), ")")
                        : "";
                    return [4 /*yield*/, telegram.app.telegram.sendPhoto(chat, aIOPoster, {
                            caption: captionText + shareText,
                            parse_mode: "Markdown",
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error sending photo:", error_3);
                    return [3 /*break*/, 4];
                case 4:
                    _a.trys.push([4, 12, , 13]);
                    if (!shareId) return [3 /*break*/, 10];
                    return [4 /*yield*/, database.getOngoingMessages(Number(shareId)).then(function (result) {
                            return (result === null || result === void 0 ? void 0 : result.aIOPosterID) || "";
                        })];
                case 5:
                    photo = _a.sent();
                    console.log(photo + "hvjh");
                    if (!photo) {
                        return [2 /*return*/];
                    }
                    chunkSize = 10;
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < links.length)) return [3 /*break*/, 9];
                    chunk = links.slice(i, i + chunkSize);
                    formattedLinks = chunk
                        .map(function (item) {
                        return "[*".concat(escapeMarkdownV2(convertToTinySubscript(processCaption(item.caption.slice(0, 90), ""))), "*](https://t.me/").concat(env.botUserName, "?start=").concat(item.messageId, "-ong)\n");
                    })
                        .join("\n");
                    messageText = formattedLinks;
                    return [4 /*yield*/, telegram.app.telegram.sendPhoto(chat, photo, {
                            caption: messageText,
                            parse_mode: "MarkdownV2",
                            reply_markup: keyboard.makeBackupButton(),
                        })];
                case 7:
                    _a.sent();
                    console.log("Sent message with ".concat(chunk.length, " links"));
                    _a.label = 8;
                case 8:
                    i += chunkSize;
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 11];
                case 10: return [2 /*return*/];
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_4 = _a.sent();
                    console.error("Error sending message:", error_4);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
export function sendToLogGroup(chat, caption) {
    return __awaiter(this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, telegram.app.telegram.sendMessage(chat, caption || "", {
                            parse_mode: "Markdown",
                        })];
                case 1:
                    _a.sent();
                    console.log("log sent successfully!");
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error("Error sending log:", error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
