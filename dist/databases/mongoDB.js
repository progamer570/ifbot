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
import mongoose from "mongoose";
import env from "../services/env.js";
import MessageModel from "./models/messageModel.js";
import UserModel from "./models/userModel.js";
import SortModel from "./models/sortModel.js";
import AIOModel from "./models/aIOModel.js";
import OngoingModel from "./models/ongoingModel.js";
import { HindiDramaModel } from "./models/aIOModel.js";
import { InviteService } from "./inviteService.js";
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        this.db = mongoose;
        this.MessageModel = MessageModel;
        this.UserModel = UserModel;
        this.SortModel = SortModel;
        this.AIOModel = AIOModel;
        this.OngoingModel = OngoingModel;
        this.HindiDramaModel = HindiDramaModel;
        this.databaseUrl = env.databaseUrl || "";
        this.inviteService = new InviteService();
    }
    MongoDB.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.connect(this.databaseUrl)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.saveMessages = function (shareId, messageIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.MessageModel({
                            shareId: shareId,
                            messageIds: messageIds,
                        }).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, shareId];
                }
            });
        });
    };
    MongoDB.prototype.saveUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.UserModel.findOne({ id: Number(user.id) })];
                    case 1:
                        existingUser = _a.sent();
                        if (!!existingUser) return [3 /*break*/, 3];
                        return [4 /*yield*/, new this.UserModel(user).save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, user];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error saving user:", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, user];
                }
            });
        });
    };
    MongoDB.prototype.getAllUserIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, userIds, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel.find().select("id")];
                    case 1:
                        users = _a.sent();
                        userIds = users.map(function (user) { return user.id; });
                        return [2 /*return*/, userIds];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error fetching user IDs:", error_2);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.isUserExist = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userExists, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserModel.findOne({ id: Number(userId) })];
                    case 1:
                        userExists = _a.sent();
                        console.log(userExists);
                        return [2 /*return*/, (userExists === null || userExists === void 0 ? void 0 : userExists.id) ? true : false];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error checking user existence:", error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.countUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var itemCount, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserModel.countDocuments()];
                    case 1:
                        itemCount = _a.sent();
                        return [2 /*return*/, ": ".concat(itemCount)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, "Error counting users"];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.saveSort = function (sort) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.SortModel(sort).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, sort];
                }
            });
        });
    };
    MongoDB.prototype.removeFirstItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var document_1, removedItem, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, SortModel.findOne({}, { sort: { $slice: 1 } })];
                    case 1:
                        document_1 = _a.sent();
                        if (!document_1 || document_1.sort.length === 0) {
                            console.log("No document found or the sort array is empty.");
                            return [2 /*return*/, null];
                        }
                        removedItem = document_1.sort[0];
                        return [4 /*yield*/, SortModel.findOneAndUpdate({ _id: document_1._id }, { $pop: { sort: -1 } }, { new: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, removedItem];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.getMessages = function (shareId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.MessageModel.findOne({ shareId: shareId })];
                    case 1: return [2 /*return*/, (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.messageIds];
                }
            });
        });
    };
    MongoDB.prototype.getAIOMessages = function (shareId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.AIOModel.findOne({ shareId: shareId })];
                    case 1: return [2 /*return*/, (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.messageIds];
                }
            });
        });
    };
    MongoDB.prototype.getOngoingMessages = function (shareId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.OngoingModel.findOne({ shareId: shareId })];
                    case 1: return [2 /*return*/, (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.messageIds];
                }
            });
        });
    };
    MongoDB.prototype.saveAIO = function (aio) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.AIOModel(aio).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, aio];
                }
            });
        });
    };
    MongoDB.prototype.saveOngoing = function (ong) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.OngoingModel(ong).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ong];
                }
            });
        });
    };
    MongoDB.prototype.getHindiMessages = function (shareId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.HindiDramaModel.findOne({ shareId: shareId })];
                    case 1: return [2 /*return*/, (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.messageIds];
                }
            });
        });
    };
    MongoDB.prototype.saveHindiDrama = function (aio) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.HindiDramaModel(aio).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, aio];
                }
            });
        });
    };
    MongoDB.prototype.searchAIO = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTitle, first20Chars, query, specialQuery, keywords, regexPattern, results, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!criteria.aIOTitle || criteria.aIOTitle.length < 2) {
                            console.log("Please provide a valid search criteria.");
                            return [2 /*return*/, undefined];
                        }
                        normalizedTitle = criteria.aIOTitle;
                        first20Chars = normalizedTitle.slice(0, 20);
                        query = {
                            aIOTitle: { $regex: new RegExp(first20Chars, "i") },
                        };
                        specialQuery = {};
                        if (first20Chars.length > 4) {
                            keywords = first20Chars
                                .replace(/\s+/g, " ")
                                .split(" ")
                                .map(function (keyword) { return "(?=.*".concat(keyword, ")"); })
                                .join("");
                            regexPattern = new RegExp("^".concat(keywords), "i");
                            specialQuery = {
                                aIOTitle: { $regex: regexPattern },
                            };
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.AIOModel.find(query)];
                    case 2:
                        results = _a.sent();
                        if (!(results.length === 0 && Object.keys(specialQuery).length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.AIOModel.find(specialQuery)];
                    case 3:
                        results = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, results];
                    case 5:
                        err_2 = _a.sent();
                        console.error("Error executing the query:", err_2);
                        return [2 /*return*/, undefined];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.searchHindiDrama = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTitle, first20Chars, query, specialQuery, keywords, regexPattern, results, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!criteria.aIOTitle || criteria.aIOTitle.length < 2) {
                            console.log("Please provide a valid search criteria.");
                            return [2 /*return*/, undefined];
                        }
                        normalizedTitle = criteria.aIOTitle;
                        first20Chars = normalizedTitle.slice(0, 20);
                        query = {
                            aIOTitle: { $regex: new RegExp(first20Chars, "i") },
                        };
                        specialQuery = {};
                        if (first20Chars.length > 4) {
                            keywords = first20Chars
                                .replace(/\s+/g, " ")
                                .split(" ")
                                .map(function (keyword) { return "(?=.*".concat(keyword, ")"); })
                                .join("");
                            regexPattern = new RegExp("^".concat(keywords), "i");
                            specialQuery = {
                                aIOTitle: { $regex: regexPattern },
                            };
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.HindiDramaModel.find(query)];
                    case 2:
                        results = _a.sent();
                        if (!(results.length === 0 && Object.keys(specialQuery).length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.HindiDramaModel.find(specialQuery)];
                    case 3:
                        results = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, results];
                    case 5:
                        err_3 = _a.sent();
                        console.error("Error executing the query:", err_3);
                        return [2 /*return*/, undefined];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.addAIO = function (shareId, messageIds) {
        return __awaiter(this, void 0, void 0, function () {
            var aioDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AIOModel.findOne({ shareId: shareId })];
                    case 1:
                        aioDocument = _a.sent();
                        if (!aioDocument) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.AIOModel.findByIdAndUpdate(aioDocument.id, { $push: { messageIds: { $each: messageIds } } }, { new: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    MongoDB.prototype.deleteAIO = function (shareId) {
        return __awaiter(this, void 0, void 0, function () {
            var animeDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AIOModel.findOne({ shareId: shareId })];
                    case 1:
                        animeDocument = _a.sent();
                        if (!animeDocument) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.AIOModel.findByIdAndDelete(animeDocument.id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    MongoDB.prototype.updateAIOAttribute = function (shareId, updateQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AIOModel.updateOne({ shareId: shareId }, { $set: updateQuery })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_5 = _a.sent();
                        console.error("Error updating drama attribute:", error_5);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //invite
    MongoDB.prototype.addInvite = function (userId, invitedUsername, invitedUserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inviteService.addInvite(userId, invitedUsername, invitedUserId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.getInviteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.inviteService.getInviteUser(userId)];
            });
        });
    };
    MongoDB.prototype.canRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.inviteService.canRequest(userId)];
            });
        });
    };
    MongoDB.prototype.useRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inviteService.useRequest(userId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MongoDB;
}());
var mongoDB = new MongoDB();
export default mongoDB;
