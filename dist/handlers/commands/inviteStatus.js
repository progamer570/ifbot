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
import { generateInviteLink } from "../../utils/helper.js";
import database from "../../services/database.js";
export default function inviteStatusHandler(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, userName, inviteStatus, totalInvites, usedInvites, remainingInvites, inviteLink, shareInviteLink, responseMessage, error_1;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, , 9]);
                    userId = (_b = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString();
                    userName = ((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.username) || ((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.first_name) || "Unknown User";
                    if (!!userId) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("❌ Unable to retrieve your user information. Please try again.")];
                case 1:
                    _e.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, database.getInviteStatus(userId.toString())];
                case 3:
                    inviteStatus = _e.sent();
                    if (!!inviteStatus) return [3 /*break*/, 5];
                    return [4 /*yield*/, ctx.reply("\u2139\uFE0F Invite status not found for the user.")];
                case 4:
                    _e.sent();
                    return [2 /*return*/];
                case 5:
                    totalInvites = inviteStatus.totalInvites, usedInvites = inviteStatus.usedInvites, remainingInvites = inviteStatus.remainingInvites;
                    inviteLink = generateInviteLink(userId, false);
                    shareInviteLink = generateInviteLink(userId, true);
                    responseMessage = "\n\uD83D\uDCCA  Invite Status for ".concat(userName, ":\n-   Total Invites: ").concat(totalInvites, "\n-   Used Invites: ").concat(usedInvites, "\n-   Remaining Invites: ").concat(remainingInvites, "\n-   your invite link: ").concat(inviteLink, "\n");
                    return [4 /*yield*/, ctx.reply(responseMessage.trim(), {
                            parse_mode: "HTML",
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: "Unlock premium with your invites!",
                                            callback_data: "unlockpremium-".concat(remainingInvites),
                                        },
                                    ],
                                    [
                                        {
                                            text: "Invite your friends",
                                            url: shareInviteLink,
                                        },
                                    ],
                                ],
                            },
                        })];
                case 6:
                    _e.sent();
                    return [3 /*break*/, 9];
                case 7:
                    error_1 = _e.sent();
                    return [4 /*yield*/, ctx.reply("⚠️ An unexpected error occurred. Please try again later.")];
                case 8:
                    _e.sent();
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
