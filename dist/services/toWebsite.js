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
import env from "./env.js";
import logger from "../utils/logger.js";
/**
 * Sends data to the given server endpoint using fetch.
 * @param {string} serverUrl - The API endpoint URL.
 * @param {string} imageUrl - The Telegram image link.
 * @param {string} token - Authorization token.
 * @param {Record<string, any>} extraData - Additional data (e.g., caption, userId, etc.).
 * @returns {Promise<any | null>} - The server response or null on error.
 */
export function addToWebsite(imageUrl_1) {
    return __awaiter(this, arguments, void 0, function (imageUrl, aIOData) {
        var payload, response, data, error_1;
        if (aIOData === void 0) { aIOData = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    payload = JSON.stringify({
                        imageUrl: imageUrl,
                        token: env.apiFetchToken,
                        aIOData: aIOData,
                    });
                    return [4 /*yield*/, fetch("".concat(env.apiBaseUrl, "/add-aio"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(env.apiFetchToken),
                            },
                            body: payload,
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server error: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    logger.info("✅ Server Response (addToWebsite):");
                    logger.info(data);
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    logger.error("❌ Error (addToWebsite):", error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function updateToWebsite(shareId, isPoster, updateQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    payload = JSON.stringify({
                        isPoster: isPoster,
                        shareId: shareId,
                        updateQuery: updateQuery,
                    });
                    return [4 /*yield*/, fetch("".concat(env.apiBaseUrl, "/aio"), {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(env.apiFetchToken),
                            },
                            body: payload,
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server error: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    logger.info("✅ Server Response (updateToWebsite):");
                    logger.info(data);
                    return [2 /*return*/, data];
                case 3:
                    error_2 = _a.sent();
                    logger.error("❌ Error (updateToWebsite):", error_2);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function deleteToWebsite(shareId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(env.apiBaseUrl, "/aio"), {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(env.apiFetchToken),
                            },
                            body: JSON.stringify({ shareId: shareId }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Server error: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    logger.info("✅ Server Response (deleteToWebsite):");
                    logger.info(data);
                    return [2 /*return*/, data];
                case 3:
                    error_3 = _a.sent();
                    logger.error("❌ Error (deleteToWebsite):", error_3);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
