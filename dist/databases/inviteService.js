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
import InviteModel from "./models/inviteModel.js";
import logger from "../utils/logger.js";
var InviteService = /** @class */ (function () {
    function InviteService() {
    }
    InviteService.prototype.addInvite = function (userId, invitedUsername, invitedUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, InviteModel.findOne({ userId: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            user = new InviteModel({
                                userId: userId,
                                invites: [],
                                lastRequestDate: new Date(0),
                                dailyRequests: 5,
                            });
                        }
                        if (user.invites.some(function (invite) { return invite.username === invitedUsername; })) {
                            throw new Error("User already invited.");
                        }
                        user.invites.push({ username: invitedUsername, userId: invitedUserId });
                        user.dailyRequests += 1;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InviteService.prototype.getInviteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, InviteModel.findOne({ userId: userId }).exec()];
            });
        });
    };
    InviteService.prototype.canRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var today, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        today = new Date().setHours(0, 0, 0, 0);
                        return [4 /*yield*/, InviteModel.findOne({ userId: userId })];
                    case 1:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 3];
                        user = new InviteModel({
                            userId: userId,
                            lastRequestDate: new Date(0),
                            invites: [],
                            dailyRequests: 5,
                        });
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(user.lastRequestDate.setHours(0, 0, 0, 0) !== today)) return [3 /*break*/, 5];
                        user.dailyRequests = 5 + user.invites.length;
                        user.lastRequestDate = new Date();
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, user.dailyRequests > 0];
                }
            });
        });
    };
    InviteService.prototype.useRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, InviteModel.findOne({ userId: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user || user.dailyRequests <= 0) {
                            throw new Error("No more requests allowed today.");
                        }
                        user.dailyRequests -= 1;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InviteService.prototype.getTopInviters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topInviters, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, InviteModel.aggregate([
                                {
                                    $project: {
                                        userId: 1, // Include userId
                                        inviteCount: { $size: "$invites" }, // Calculate the number of invites
                                    },
                                },
                                { $sort: { inviteCount: -1 } }, // Sort by inviteCount in descending order
                                { $limit: 15 },
                            ])];
                    case 1:
                        topInviters = _a.sent();
                        return [2 /*return*/, topInviters];
                    case 2:
                        error_1 = _a.sent();
                        logger.error("Error fetching top inviters:", error_1);
                        throw new Error("Failed to fetch top inviters.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InviteService.prototype.resetUserInvites = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, InviteModel.updateOne({ userId: userId }, { $set: { invites: [] } })];
                    case 1:
                        result = _a.sent();
                        if (result.matchedCount === 0) {
                            logger.info("No user found with userId: ".concat(userId));
                        }
                        else if (result.modifiedCount === 0) {
                            logger.info("No changes made. Invites were already empty for userId: ".concat(userId));
                        }
                        else {
                            logger.info("Successfully reset invites for userId: ".concat(userId));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        logger.error("Error resetting invites for user:", error_2);
                        throw new Error("Failed to reset invites for the user.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InviteService.prototype.updateInviteUsed = function (userId, newUsedInvites) {
        return __awaiter(this, void 0, void 0, function () {
            var user, oldUsedInvites, updatedUsedInvites, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, InviteModel.findOne({ userId: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            logger.info("No user found with userId: ".concat(userId));
                            return [2 /*return*/, false];
                        }
                        oldUsedInvites = user.inviteUsed || 0;
                        updatedUsedInvites = oldUsedInvites + newUsedInvites;
                        return [4 /*yield*/, InviteModel.updateOne({ userId: userId }, { $set: { inviteUsed: updatedUsedInvites } })];
                    case 2:
                        result = _a.sent();
                        if (result.modifiedCount > 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            logger.info("No changes made. InviteUsed for userId: ".concat(userId, " remains the same."));
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        logger.error("Error updating inviteUsed:", error_3);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InviteService.prototype.getInviteStatus = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, totalInvites, usedInvites, remainingInvites, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, InviteModel.findOne({ userId: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            logger.info("No user found with userId: ".concat(userId));
                            return [2 /*return*/, null];
                        }
                        totalInvites = user.invites.length;
                        usedInvites = user.inviteUsed || 0;
                        remainingInvites = Math.max(0, totalInvites - usedInvites);
                        return [2 /*return*/, { totalInvites: totalInvites, usedInvites: usedInvites, remainingInvites: remainingInvites }];
                    case 2:
                        error_4 = _a.sent();
                        logger.error("Error fetching invite status:", error_4);
                        throw new Error("Failed to fetch invite status.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InviteService;
}());
export { InviteService };
