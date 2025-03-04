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
import { getSystemUsage, getSystemUsageDetails } from "../extra/systemUses.js";
import auth from "../services/auth.js";
import database from "../services/database.js";
import { autoReplyMemory } from "../handlers/commands/autoReact.js";
import { getRandomReactionEmoji } from "../utils/helper.js";
export default {
    private: function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var messageText, _a, command, args, _b, error_1, callbackData, message, err_1, callbackData, inviteStatus, remainingInvites, success, result, error_2;
            var _this = this;
            var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        console.log((_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id);
                        if (!(ctx.message && "text" in ctx.message && auth.isAdmin((_e = (_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : 0))) return [3 /*break*/, 18];
                        messageText = (_f = ctx.message) === null || _f === void 0 ? void 0 : _f.text;
                        _a = messageText.split(" "), command = _a[0], args = _a.slice(1);
                        _r.label = 1;
                    case 1:
                        _r.trys.push([1, 16, , 18]);
                        _b = command;
                        switch (_b) {
                            case "/setLink": return [3 /*break*/, 2];
                            case "/getFirstItem": return [3 /*break*/, 4];
                            case "/setActive": return [3 /*break*/, 6];
                            case "/addsort": return [3 /*break*/, 8];
                            case "/deletesort": return [3 /*break*/, 10];
                            case "/systemuses": return [3 /*break*/, 12];
                        }
                        return [3 /*break*/, 14];
                    case 2: return [4 /*yield*/, handleSetLink(ctx, args)];
                    case 3:
                        _r.sent();
                        return [3 /*break*/, 15];
                    case 4: return [4 /*yield*/, handleGetFirstItem(ctx)];
                    case 5:
                        _r.sent();
                        return [3 /*break*/, 15];
                    case 6: return [4 /*yield*/, handleSetActive(ctx, args)];
                    case 7:
                        _r.sent();
                        return [3 /*break*/, 15];
                    case 8: return [4 /*yield*/, handleUpdateFirstAndActive(ctx, args)];
                    case 9:
                        _r.sent();
                        return [3 /*break*/, 15];
                    case 10: return [4 /*yield*/, deleteSort(ctx)];
                    case 11:
                        _r.sent();
                        return [3 /*break*/, 15];
                    case 12: return [4 /*yield*/, handleSystemUses(ctx)];
                    case 13:
                        _r.sent();
                        return [3 /*break*/, 15];
                    case 14: return [3 /*break*/, 15];
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        error_1 = _r.sent();
                        console.error("Error handling command:", error_1);
                        return [4 /*yield*/, ctx.reply("An error occurred while processing your request.")];
                    case 17:
                        _r.sent();
                        return [3 /*break*/, 18];
                    case 18:
                        if (autoReplyMemory[(_g = ctx.from) === null || _g === void 0 ? void 0 : _g.id]) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, ctx.react(getRandomReactionEmoji()).catch(function (error) {
                                                console.error("Failed to react:", error);
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 60000);
                        }
                        if (((_h = ctx.chat) === null || _h === void 0 ? void 0 : _h.id) !== undefined) {
                            if (ctx.chat.type === "private" || env.allowGroups.includes(ctx.chat.id)) {
                                next();
                            }
                        }
                        if (ctx.message && containsSGD(ctx.message)) {
                            try {
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, ctx.deleteMessage((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.message_id).catch(function (error) {
                                                    console.error("Failed to delete message:", error);
                                                })];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 200000);
                            }
                            catch (error) {
                                console.error("Unexpected error while deleting message:", error);
                            }
                        }
                        if (!auth.isAdmin((_k = (_j = ctx.from) === null || _j === void 0 ? void 0 : _j.id) !== null && _k !== void 0 ? _k : 0)) return [3 /*break*/, 23];
                        if (!(ctx.callbackQuery && "data" in ctx.callbackQuery)) return [3 /*break*/, 23];
                        callbackData = ctx.callbackQuery.data;
                        _r.label = 19;
                    case 19:
                        _r.trys.push([19, 22, , 23]);
                        message = void 0;
                        switch (callbackData) {
                            case "addDrama":
                                message = "";
                                break;
                            case "addOngoing":
                                message = "use /add to add new drama or series or movie";
                                break;
                            case "editDrama":
                                message = "use </edit drama name> to edit uploaded drama or series or movie";
                                break;
                            case "addHindi":
                                message = "use /addh to add new hindi drama or series or movie";
                                break;
                            case "addOngoing":
                                message = "use /addong to add ongoing drama or series or movie";
                                break;
                            case "search":
                                message = "send uploaded drama or series or movie name ";
                                break;
                            case "broadcast":
                                message = "reply to the message /broadcast that you want to broadcast to your user";
                                break;
                            default:
                                message = "";
                        }
                        if (!message) return [3 /*break*/, 21];
                        return [4 /*yield*/, ctx.reply(message)];
                    case 20:
                        _r.sent();
                        _r.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        err_1 = _r.sent();
                        console.log("Error handling callback:", err_1);
                        return [3 /*break*/, 23];
                    case 23:
                        if (!(ctx.callbackQuery && "data" in ctx.callbackQuery)) return [3 /*break*/, 36];
                        callbackData = ctx.callbackQuery.data;
                        _r.label = 24;
                    case 24:
                        _r.trys.push([24, 35, , 36]);
                        if (!callbackData.startsWith("unlockpremium")) return [3 /*break*/, 34];
                        return [4 /*yield*/, database.getInviteStatus(((_l = ctx.from) === null || _l === void 0 ? void 0 : _l.id.toString()) || "")];
                    case 25:
                        inviteStatus = _r.sent();
                        if (!inviteStatus) return [3 /*break*/, 33];
                        remainingInvites = inviteStatus.remainingInvites;
                        if (!(remainingInvites <= 7)) return [3 /*break*/, 27];
                        return [4 /*yield*/, ctx.reply("You don't have enough invites to unlock premium features. minimum 7 invites required to unlock premium features.")];
                    case 26:
                        _r.sent();
                        return [2 /*return*/];
                    case 27: return [4 /*yield*/, database.updateInviteUsed((((_m = ctx.from) === null || _m === void 0 ? void 0 : _m.id) || 0).toString(), remainingInvites)];
                    case 28:
                        success = _r.sent();
                        return [4 /*yield*/, database.addBotPremium(((_o = ctx.from) === null || _o === void 0 ? void 0 : _o.id.toString()) || "0", "".concat(remainingInvites, "d"))];
                    case 29:
                        result = _r.sent();
                        return [4 /*yield*/, ctx.reply("[".concat((_p = ctx.from) === null || _p === void 0 ? void 0 : _p.first_name, "](tg://user?id=").concat((_q = ctx.from) === null || _q === void 0 ? void 0 : _q.id, ")\n").concat(result), {
                                parse_mode: "Markdown",
                            })];
                    case 30:
                        _r.sent();
                        if (!success) return [3 /*break*/, 32];
                        return [4 /*yield*/, ctx.reply("You have successfully unlocked premium features for ".concat(remainingInvites, " days."))];
                    case 31:
                        _r.sent();
                        _r.label = 32;
                    case 32: return [3 /*break*/, 34];
                    case 33:
                        console.log("No valid invite data found");
                        _r.label = 34;
                    case 34: return [3 /*break*/, 36];
                    case 35:
                        error_2 = _r.sent();
                        console.error("Error occurred:", error_2);
                        return [3 /*break*/, 36];
                    case 36: return [2 /*return*/];
                }
            });
        });
    },
};
function containsSGD(message) {
    return (message.animation !== undefined ||
        message.sticker !== undefined ||
        message.document !== undefined);
}
function handleSetLink(ctx, args) {
    return __awaiter(this, void 0, void 0, function () {
        var shareId, aioShortUrl, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shareId = args[0], aioShortUrl = args[1];
                    if (!(!shareId || !aioShortUrl)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Usage: /setLink <shareId> <aioShortUrl>")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, database.addLinkToFirstSort({
                        shareId: Number(shareId),
                        aioShortUrl: aioShortUrl,
                    })];
                case 3:
                    success = _a.sent();
                    return [4 /*yield*/, ctx.reply(success ? "Link added successfully!" : "Failed to add link.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Handle the "/getFirstItem" command
function handleGetFirstItem(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var firstItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.getFirstSortItem()];
                case 1:
                    firstItem = _a.sent();
                    return [4 /*yield*/, ctx.reply(firstItem ? "First Item: ".concat(JSON.stringify(firstItem)) : "No items found.")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Handle the "/setActive" command
function handleSetActive(ctx, args) {
    return __awaiter(this, void 0, void 0, function () {
        var newActiveShareId, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newActiveShareId = args[0];
                    if (!!newActiveShareId) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Usage: /setActive <newActiveShareId>")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, database.setActiveShareId(newActiveShareId)];
                case 3:
                    success = _a.sent();
                    return [4 /*yield*/, ctx.reply(success ? "Active Share ID set successfully!" : "Failed to set Active Share ID.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Handle the "/updateFirstAndActive" command
function handleUpdateFirstAndActive(ctx, args) {
    return __awaiter(this, void 0, void 0, function () {
        var shareId, aioShortUrl, newActiveShareId, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shareId = args[0], aioShortUrl = args[1], newActiveShareId = args[2];
                    if (!(!shareId || !aioShortUrl || !newActiveShareId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Usage: /updateFirstAndActive <shareId> <aioShortUrl> <newActiveShareId>")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, database.updateFirstSortAndActivePath({ shareId: Number(shareId), aioShortUrl: aioShortUrl }, newActiveShareId)];
                case 3:
                    success = _a.sent();
                    return [4 /*yield*/, ctx.reply(success
                            ? "First sort item and Active Share ID updated successfully!"
                            : "Failed to update First sort item and Active Share ID.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Handle the "/systemuses" command
function handleSystemUses(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 1, , 3]);
                    ctx.reply("System uses by: " + getSystemUsageDetails() + "\nSystem uses by machine: " + getSystemUsage());
                    return [3 /*break*/, 3];
                case 1:
                    error_3 = _a.sent();
                    console.error("Error fetching system usage:", error_3);
                    return [4 /*yield*/, ctx.reply("Failed to retrieve system usage information.")];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleteSort(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.deleteAllSortData()];
                case 1:
                    success = _a.sent();
                    return [4 /*yield*/, ctx.reply(success ? "Deleted successfully" : "Failed to delete Sort.")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
