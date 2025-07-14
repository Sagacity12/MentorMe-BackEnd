"use strict";
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
        while (_) try {
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
exports.__esModule = true;
exports.constructHTTPResponse = exports.getPageFormat = exports.getSanitizeOffset = exports.getSanitizePage = exports.getSanitizeSort = exports.getSanitizeLimit = exports.generateOTP = exports.verifySocketToken = exports.jwtVerify = exports.jwtSign = exports.comparePassword = exports.hashPassword = void 0;
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var http_errors_1 = require("http-errors");
//import { getUserById } from "../../services/user";
/**
 *
 * @param password
 * @returns
 */
exports.hashPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var salt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt_1["default"].genSalt(10)];
            case 1:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1["default"].hash(password, salt)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 *
 * @param password
 * @param hash
 */
exports.comparePassword = function (password, hash) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt_1["default"].compare(password, hash)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 *
 * @param obj
 * @returns
 */
exports.jwtSign = function (obj) {
    return jsonwebtoken_1["default"].sign(obj, "" + process.env.JWT_SECRET, { expiresIn: "30d" });
};
exports.jwtVerify = function (token) {
    return jsonwebtoken_1["default"].verify(token, "" + process.env.JWT_SECRET);
};
/**
 *
 * @param socket
 * @param next
 */
exports.verifySocketToken = function (socket, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, data;
    var _a;
    return __generator(this, function (_b) {
        try {
            token = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token;
            if (!token)
                throw new http_errors_1["default"].Forbidden("Forbidden");
            data = exports.jwtVerify(token);
            if (!data.id)
                throw new http_errors_1["default"].Unauthorized('Unauthorized');
            // const user = await getUserById(data.id);
            //socket.user = user;
        }
        catch (error) {
            // throw createHttpError.Unauthorized(error?.message);
        }
        return [2 /*return*/];
    });
}); };
/**
 * generate a ramdom otp of a given lenght for verification
 * @param len lenght of the otp
 * @returns otp code
 */
exports.generateOTP = function (len) {
    var digits = "0123456789";
    var Length = digits.length;
    var otp = "";
    for (var i = 0; i < len; i++) {
        otp += digits.charAt(Math.floor(Math.random() * Length));
    }
    return otp;
};
/**
 * sanitize limit query param
 * @param limit limit number
 * @returns sanitized limit
 * @example getSanitizeLimit(10) // 10
 * @example getSanitizeLimit(10) // 10
 * @example getSanitizeLimit(100) // 10
 * @example getSanitizeLimit('') // 10
 */
exports.getSanitizeLimit = function (limit) {
    var limitNumber = Number(limit);
    if (Number.isNaN(limitNumber))
        return 10;
    return Math.min(Math.max(limitNumber, 1), 100);
};
/**
 * get Sanitize sort array for sorting
 * @param sort sort params
 * @returns sanitize sort array
 */
exports.getSanitizeSort = function (sort) {
    var sortArray = (sort === null || sort === void 0 ? void 0 : sort.split(',').join('')) || ['fullName'];
    return sortArray;
};
/**
 * get sanitized page number for pagenation
 * @param page page number
 * @returns sanitized page number
 */
exports.getSanitizePage = function (page) {
    var pageNumber = Number(page);
    if (Number.isNaN(pageNumber))
        return 1;
    return Math.max(pageNumber, 1);
};
/**
 * get sanitize offset for paginaton
 * @param limit limt number
 * @param page page number
 * @returns sanitized offset value
 */
exports.getSanitizeOffset = function (limit, page) {
    return (page - 1) * limit;
};
/**
 *
 * @param data
 * @param page
 * @param limit
 * @returns
 */
exports.getPageFormat = function (data, page, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var hasNextPage, edges, pageInfo;
    return __generator(this, function (_a) {
        hasNextPage = data.length > limit;
        edges = hasNextPage ? data.slice(0, limit) : data;
        pageInfo = { page: page, limit: limit, total: data.length, hasNextPage: hasNextPage };
        return [2 /*return*/, {
                data: edges,
                info: pageInfo
            }];
    });
}); };
/**
 *
 * @param data
 * @param error
 * @param statusCode
 * @returns
 */
exports.constructHTTPResponse = function (data, error, statusCode) {
    if (data === void 0) { data = null; }
    if (error === void 0) { error = null; }
    if (statusCode === void 0) { statusCode = 200; }
    return function (res) {
        if (error) {
            return res.status(statusCode).json({
                error: {
                    message: error.message,
                    statusCode: error.statusCode || statusCode
                }
            });
        }
        return res.status(statusCode).json({
            data: data,
            statusCode: statusCode
        });
    };
};
