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
exports.authorizeRoles = exports.authMiddleware = void 0;
var http_errors_1 = require("http-errors");
var helper_1 = require("../helpers/helper");
var logger_1 = require("../logger");
var http_errors_2 = require("http-errors");
var blacklistedTokens_1 = require("../helpers/blacklistedTokens");
/**
 * Authentication middleware to protect routes
 * Verifies JWT token from Authorization header
 */
exports.authMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, tokenHeader, token, blacklisted, decodedToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authHeader = req.headers.authorization;
                tokenHeader = Array.isArray(authHeader) ? authHeader[0] : authHeader;
                if (!tokenHeader || !tokenHeader.startsWith('Bearer')) {
                    return [2 /*return*/, next(http_errors_1["default"](401, 'No authentication token provided'))];
                }
                token = tokenHeader.split(' ')[1];
                if (!token) {
                    return [2 /*return*/, next(http_errors_1["default"](401, 'Invalide authentication token'))];
                }
                return [4 /*yield*/, blacklistedTokens_1.isTokenBlacklisted(token)];
            case 1:
                blacklisted = _a.sent();
                if (blacklisted) {
                    return [2 /*return*/, next(http_errors_2["default"](401, ' Token has been revoked '))];
                }
                decodedToken = helper_1.jwtVerify(token);
                req.user = decodedToken;
                next();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                logger_1.logger.error('Authentication error:', error_1);
                return [2 /*return*/, next(http_errors_2["default"](401, 'Authentication failed'))];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Role-based authorization middleware
 */
exports.authorizeRoles = function (allowedRoles) {
    return function (req, res, next) {
        if (!req.user) {
            return next(http_errors_2["default"](401, 'You do not have permission to access this resource'));
        }
        var userRole = req.user.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return next(http_errors_2["default"](403, 'Insufficient permissions for this operation'));
        }
        next();
    };
};
exports["default"] = { authMiddleware: exports.authMiddleware, authorizeRoles: exports.authorizeRoles };
