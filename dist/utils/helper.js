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
import env from "../services/env.js";
import telegram from "../services/telegram.js";
export function sendTokenExpiredMessage(ctx, user, shortUrl, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var firstName, message;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    message = "Hello ".concat(firstName, ", your token has expired.  \nYou can generate a new token once a day, which takes just 30\u201340 seconds. After that, you\u2019ll enjoy unlimited requests for the next 24 hours!\n");
                    if (env.howToGenerateToken) {
                        message += "Tutorial:\n[TO KNOW HOW TO GENERATE NEW TOKEN](".concat(env.howToGenerateToken, ")");
                    }
                    message += "\nANY PROBLEM CONTACT: [ADMIN](tg://user?id=".concat(env.adminIds[0], ")");
                    return [4 /*yield*/, ctx.reply(message, {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: "Click Me To Generate New Token",
                                            url: shortUrl,
                                        },
                                    ],
                                    [
                                        {
                                            text: "Try Again",
                                            url: "https://t.me/".concat(env.botUserName, "?start=").concat(payload).replace(" ", ""),
                                        },
                                    ],
                                ],
                            },
                            parse_mode: "Markdown",
                            link_preview_options: { is_disabled: true },
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
import { Markup } from "telegraf";
export function sendWelcomeMessage(ctx, user, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var firstName, message, groupLink, keyboard;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    message = "\uD83D\uDC4B \u029C\u1D07\u029F\u029F\u1D0F [".concat(firstName, "](tg://user?id=").concat(userId, ")!\n\u026A \u1D00\u1D0D \u1D00 \u1D18\u1D0F\u1D21\u1D07\u0280\uA730\u1D1C\u029F \u0299\u1D0F\u1D1B \u1D1B\u029C\u1D00\u1D1B \u1D21\u1D0F\u0280\u1D0Bs \u026A\u0274 \u0262\u0280\u1D0F\u1D1C\u1D18s. \n").concat(escapeMarkdownV2(env.request), "\n\n");
                    return [4 /*yield*/, telegram
                            .getInviteLink(env.allowGroups[0])
                            .catch(function (error) { return console.log(error); })];
                case 1:
                    groupLink = _b.sent();
                    keyboard = Markup.inlineKeyboard([
                        [
                            Markup.button.url("📌 Send Your Request Name Here 📌", groupLink || "https://t.me/kdrama_cht"),
                        ],
                        [Markup.button.callback("🛠 ʜᴇʟᴘ", "features"), Markup.button.callback("💌 ᴀʙᴏᴜᴛ", "about")],
                        [Markup.button.callback("🎟 ᴘʀᴇᴍɪᴜᴍ", "seeplans"), Markup.button.callback("🎁 ʀᴇғᴇʀ", "refer")],
                    ]);
                    return [4 /*yield*/, ctx.reply(message, __assign({ parse_mode: "Markdown", link_preview_options: { is_disabled: true } }, keyboard))];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendDailyLimitMessage(ctx, user, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var firstName, inviteLink, message;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstName = (((_a = user.first_name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
                    inviteLink = generateInviteLink(userId, false);
                    message = "Hello ".concat(firstName, "!\nYou can make up to 5 requests per day. Increase your limit by inviting users! Each user adds 1 extra daily request.\nYour invite link is: \"").concat(inviteLink, "\"");
                    return [4 /*yield*/, ctx.reply(message, {
                            parse_mode: "HTML",
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendInviterWelcomeMessage(ctx, inviterId) {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = "Welcome! You were invited by a user with ID ".concat(inviterId, ".\nJoin our main channel for unlimited movies, dramas, and more. Stay updated with the latest releases and exclusive content.\nClick the link to join and start enjoying now!\n").concat(env.join, "\n\n");
                    return [4 /*yield*/, ctx.reply(message, { parse_mode: "Markdown", link_preview_options: { is_disabled: true } })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function sendTokenGeneratedMessage(ctx, token) {
    return __awaiter(this, void 0, void 0, function () {
        var truncatedToken, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    truncatedToken = "".concat(token.slice(0, 5), " ...");
                    message = "Your new token is generated: ".concat(truncatedToken, ",\nNow click on the Try Again button \uD83D\uDC46\uD83D\uDC46!");
                    return [4 /*yield*/, ctx.reply(message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export var generateInviteLink = function (userId, sharLink) {
    if (sharLink) {
        return "https://t.me/share/url?url=https://t.me/".concat(env.botUserName, "?start=invite-").concat(userId);
    }
    return "https://t.me/".concat(env.botUserName, "?start=invite-").concat(userId);
};
export function getRandomReactionEmoji() {
    var emojis = ["👍", "👎", "🔥", "🎉", "😢", "😡", "👏"];
    var randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}
export function hasReplyToMessage(message) {
    return message && message.reply_to_message !== undefined;
}
export function isTextMessage(message) {
    return message && typeof message.text === "string";
}
export var getUrlFromFileId = function (fromFileId) { return __awaiter(void 0, void 0, void 0, function () {
    var link, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, telegram.app.telegram.getFileLink(fromFileId)];
            case 1:
                link = _a.sent();
                console.log(link);
                return [4 /*yield*/, fetch(link.toString())];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res.url];
        }
    });
}); };
export function convertToTinySubscript(inputText) {
    var subscriptMapping = {
        a: "ᴀ",
        b: "ʙ",
        c: "ᴄ",
        d: "ᴅ",
        e: "ᴇ",
        f: "ғ",
        g: "ɢ",
        h: "ʜ",
        i: "ɪ",
        j: "ᴊ",
        k: "ᴋ",
        l: "ʟ",
        m: "ᴍ",
        n: "ɴ",
        o: "ᴏ",
        p: "ᴘ",
        q: "ǫ",
        r: "ʀ",
        s: "s",
        t: "ᴛ",
        u: "ᴜ",
        v: "ᴠ",
        w: "ᴡ",
        x: "x",
        y: "ʏ",
        z: "ᴢ",
        // Numbers
        // 0: "₀",
        // 1: "₁",
        // 2: "₂",
        // 3: "₃",
        // 4: "₄",
        // 5: "₅",
        // 6: "₆",
        // 7: "₇",
        // 8: "₈",
        // 9: "₉",
    };
    var tinySubscriptText = "";
    for (var _i = 0, _a = inputText.toLowerCase(); _i < _a.length; _i++) {
        var char = _a[_i];
        tinySubscriptText += subscriptMapping[char] || char;
    }
    return tinySubscriptText.replace(/[()\[\]\+\-]/g, " ").trim();
}
export function escapeMarkdownV2(text) {
    return text.replace(/[_*[\]()~`>#\+\-=|{}.!]/g, "\\$&");
}
export var premiumPlan = "\u2728 \u1D18\u0280\u1D07\u1D0D\u026A\u1D1C\u1D0D \u1D18\u029F\u1D00\u0274s \u2728\n\n\uD83D\uDCCC \u1D18\u0280\u026A\u1D04\u026A\u0274\u0262:  \n\u25B8 \u20B939 \u2507 1 \u1D21\u1D07\u1D07\u1D0B  \n\u25B8 \u20B969 \u2507 1 \u1D0D\u1D0F\u0274\u1D1B\u029C  \n\u25B8 \u20B9119 \u2507 3 \u1D0D\u1D0F\u0274\u1D1B\u029Cs  \n\u25B8 \u20B9269 \u2507 6 \u1D0D\u1D0F\u0274\u1D1B\u029Cs  \n\u25B8 \u20B9629 \u2507 1 \u028F\u1D07\u1D00\u0280  \n\u25B8 \u20B91.5\u1D0B \u2507 \u1D20\u1D00\u029F\u026A\u1D05 \u1D1B\u026A\u029F\u029F \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F \u1D07x\u026As\u1D1Bs  \n\n\uD83D\uDD39 \u1D18\u0280\u1D07\u1D0D\u026A\u1D1C\u1D0D \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F \uA730\u1D07\u1D00\u1D1B\u1D1C\u0280\u1D07s:  \n\uD83E\uDEF3 \u1D00\u1D04\u1D04\u1D07ss \u1D1B\u1D0F \u0274\u1D07\u1D21 & \u1D0F\u029F\u1D05 \u1D0D\u1D0F\u1D20\u026A\u1D07s, \uA731\u1D07\u0280\u026A\u1D07s, \u1D00\u0274\u026A\u1D0D\u1D07 & \u1D0D\u1D0F\u0280\u1D07  \n\uD83E\uDEF3 \u029C\u026A\u0262\u029C-\u01EB\u1D1C\u1D00\u029F\u026A\u1D1B\u028F \u1D04\u1D0F\u0274\u1D1B\u1D07\u0274\u1D1B \u1D00\u1D20\u1D00\u026A\u029F\u1D00\u0299\u029F\u1D07  \n\uD83E\uDEF3 \u1D05\u026A\u0280\u1D07\u1D04\u1D1B \uA730\u026A\u029F\u1D07 \u1D05\u1D0F\u1D21\u0274\u029F\u1D0F\u1D00\u1D05s \n\uD83E\uDEF3 \uA730\u1D1C\u029F\u029F \u1D00\u1D05\u1D0D\u026A\u0274 \uA731\u1D1C\u1D18\u1D18\u1D0F\u0280\u1D1B \uA730\u1D0F\u0280 \u01EB\u1D1C\u1D07\u0280\u026A\u1D07s & \u0280\u1D07\u01EB\u1D1C\u1D07\uA731\u1D1B\uA731\n\uD83E\uDEF3 \u0274\u1D0F \u0274\u1D07\u1D07\u1D05 \u1D1B\u1D0F \u1D0A\u1D0F\u026A\u0274 \u1D0D\u1D1C\u029F\u1D1B\u026A\u1D18\u029F\u1D07 \u1D04\u029C\u1D00\u0274\u0274\u1D07\u029F\uA731 \n\uD83E\uDEF3 \u1D05\u026A\u0280\u1D07\u1D04\u1D1B & \u1D00\u1D05\uA731-\uA730\u0280\u1D07\u1D07 \u1D00\u1D04\u1D04\u1D07\uA731\uA731\n \u026A\uA730 \u028F\u1D0F\u1D1C \u1D21\u1D00\u0274\u1D1B \u1D18\u0280\u1D07\u1D0D\u026A\u1D1C\u1D0D, \u1D04\u1D0F\u0274\u1D1B\u1D00\u1D04\u1D1B \u029C\u1D07\u0280\u1D07: [ADMIN](tg://user?id=".concat(env.adminIds[0], ")  \n");
export var developerInfo = "  \n\u2023 \u1D05\u1D07\u1D20\u1D07\u029F\u1D0F\u1D18\u1D07\u0280 : \u0280\u1D00\u1D0D  \n\u2023 \u026A\u1D05 : [\u0280\u1D00\u1D0D](t.me/Ram_ox)  \n\u2023 \u029F\u026A\u0299\u0280\u1D00\u0280\u028F : \u1D1B\u1D07\u029F\u1D07\u0262\u0280\u1D00\uA730  \n\u2023 \u029F\u1D00\u0274\u0262\u1D1C\u1D00\u0262\u1D07 : \u1D1Bs  \n\u2023 \u1D05\u1D00\u1D1B\u1D00\u0299\u1D00s\u1D07 : \u1D0D\u1D0F\u0274\u0262\u1D0F\u1D05\u0299  \n\u2023 \u029C\u1D0Fs\u1D1B\u1D07\u1D05 \u1D0F\u0274 : \u1D00\u029F\u029F \u1D21\u1D07\u0299  \n";
export var helpMessage = "  \n\u2728 \u029C\u1D0F\u1D21 \u1D1B\u1D0F \u0280\u1D07\u01EB\u1D1C\u1D07\uA731\u1D1B \u1D05\u0280\u1D00\u1D0D\u1D00\uA731 & \u1D0D\u1D0F\u1D20\u026A\u1D07\uA731 \u2728  \n\n1\uFE0F\u20E3 \uA731\u1D07\u1D00\u0280\u1D04\u029C \u1D1B\u029C\u1D07 \u1D04\u1D0F\u0280\u0280\u1D07\u1D04\u1D1B \u0274\u1D00\u1D0D\u1D07 \u1D0F\u0274 \u0262\u1D0F\u1D0F\u0262\u029F\u1D07.  \n2\uFE0F\u20E3 \uA731\u1D07\u0274\u1D05 \u1D1B\u029C\u1D07 \u0274\u1D00\u1D0D\u1D07 \u026A\u0274 \u1D1B\u029C\u1D07 \u0262\u0280\u1D0F\u1D1C\u1D18.  \n3\uFE0F\u20E3 \u1D1C\uA731\u1D07 \u1D1B\u029C\u026A\uA731 \uA730\u1D0F\u0280\u1D0D\u1D00\u1D1B:  \n\n\uD83D\uDE80 \uA730\u1D0F\u029F\u029F\u1D0F\u1D21 \u1D1B\u029C\u1D07\uA731\u1D07 \uA731\u1D1B\u1D07\u1D18\uA731!  \n";
export function getInviteMessage(username, userId) {
    var firstName = ((username === null || username === void 0 ? void 0 : username.replace(/[^a-zA-Z0-9]/g, "")) || "User").trim();
    var inviteLink = generateInviteLink(userId, false);
    return ("Hello ".concat(firstName, "!\n") +
        "Invite your friends and earn exclusive rewards! \uD83C\uDF89\n" +
        "Your invite link is:\n".concat(inviteLink, "\n\n") +
        "\uD83D\uDD25 \u1D21\u029C\u028F \u026A\u0274\u1D20\u026A\u1D1B\u1D07? \u1D07\u1D00\u1D04\u029C \u026A\u0274\u1D20\u026A\u1D1B\u1D07 \u1D04\u1D00\u0274 \u1D1C\u0274\u029F\u1D0F\u1D04\u1D0B s\u1D18\u1D07\u1D04\u026A\u1D00\u029F \u0299\u1D0F\u0274\u1D1Cs\u1D07s \u029F\u026A\u1D0B\u1D07 \u1D18\u0280\u1D07\u1D0D\u026A\u1D1C\u1D0D \u1D00\u1D04\u1D04\u1D07ss, \u1D07x\u1D1B\u0280\u1D00 \u1D04\u1D0F\u0274\u1D1B\u1D07\u0274\u1D1B, \u1D00\u0274\u1D05 \u1D0F\u1D1B\u029C\u1D07\u0280 \u1D07x\u1D04\u029F\u1D1Cs\u026A\u1D20\u1D07 \u0299\u1D07\u0274\u1D07\u0493\u026A\u1D1Bs! \uD83D\uDE80\n\n" +
        "\uD83D\uDCCA\u1D04\u029C\u1D07\u1D04\u1D0B \u028F\u1D0F\u1D1C\u0280 \u026A\u0274\u1D20\u026A\u1D1B\u1D07 \u1D18\u0280\u1D0F\u0262\u0280\u1D07ss: /myinvites\n" +
        "\u1D1B\u1D0F s\u1D07\u1D07 \u1D1B\u029C\u1D07 \u1D1B\u1D0F\u1D18 \u026A\u0274\u1D20\u026A\u1D1B\u1D07\u0280s: /myinvitestatus\n");
}
