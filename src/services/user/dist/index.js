"use strict";
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
exports.getMentorsOrMentees = exports.findByIdAndDelete = exports.getUserByIdUpdatePassword = exports.getUserByIdAndUpdate = exports.updatIsAuthenticated = exports.getUserByPhone = exports.findUserByEmail = exports.getUserById = exports.checkUserExists = exports.createGoogleUser = exports.createUser = void 0;
var usersSchema_1 = require("../../models/usersSchema");
var http_errors_1 = require("http-errors");
var mongoose_1 = require("mongoose");
var validateUserData_1 = require("./validateUserData");
var helpers = require("../../helpers/helper");
var mentorship = require("../../common/interfaces/mentorship/index");
var mentor = require("../../common/interfaces/mentor/index");
var mentee = require("../../common/interfaces/mentee/index");
/**
 * create a new in the database with phone and
 * password, then create auth record
 * @param data required user data
 * @returns saved user
 */
exports.createUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, validateUserData_1.validateAuthData(data)];
            case 1:
                _a.sent();
                return [4 /*yield*/, helpers.hashPassword(data.password)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, usersSchema_1.userModel.create(__assign(__assign({}, data), { password: hashedPassword }))];
            case 3:
                user = _a.sent();
                if (!user) {
                    throw new http_errors_1["default"].InternalServerError("Could not create user");
                }
                return [2 /*return*/, user];
        }
    });
}); };
/**
 * create a new user in the database with google data for those signing in with google
 * @param data required user data
 * @returns create user
 * @throws 500 if user could not be created
 */
exports.createGoogleUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersSchema_1.userModel.create(__assign({}, data))];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new http_errors_1["default"].InternalServerError("Could not create user");
                }
                return [2 /*return*/, user];
        }
    });
}); };
/**
 * checks if user already exists with the phone number
 * @param phone user's phone number
 * @throws 409 if the user already exists
 */
exports.checkUserExists = function (phone) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersSchema_1.userModel.exists({ phone: phone })];
            case 1:
                if (_a.sent()) {
                    throw new http_errors_1["default"].Conflict("User already exists");
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * find a user from a database by id
 * @param id user's id
 * @returns found user
 * @throws 404 if no user found with the id
 * @throws 400 if the id is invalid
 */
exports.getUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(id))
                    throw new http_errors_1["default"].BadRequest("Invalid user id");
                return [4 /*yield*/, usersSchema_1.userModel.findById({ _id: id }, { password: 0, __v: 0 }, null)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new http_errors_1["default"].NotFound("user not found");
                return [2 /*return*/, user];
        }
    });
}); };
/**
 * find a user from the database by email
 * @param email user's email
 * @retuns found user
 * @throws 404 if no user found with the email
 */
exports.findUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersSchema_1.userModel.findOne({ email: email })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * get a user by phone number
 * @param phone user's phone number
 * @returns user
 * @throws 404 if no user found with the phone
 */
exports.getUserByPhone = function (phone) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersSchema_1.userModel.exists({ phone: phone })];
            case 1:
                if (!(_a.sent())) {
                    throw new http_errors_1["default"].NotFound("User not found with phone number");
                }
                return [4 /*yield*/, usersSchema_1.userModel.findOne({ phone: phone })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new http_errors_1["default"].NotFound("User not found");
                return [2 /*return*/, user];
        }
    });
}); };
/**
 * find the user by id and update the user's isAuthenticated
 * field to true after verification
 * @param id user's id
 * @returns boolean true
 * @throws 404 if no user found with the id
 * @throws 400 if the id is invalid
 */
exports.updatIsAuthenticated = function (_a) {
    var id = _a.id, opt = _a.opt;
    return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, usersSchema_1.userModel.findByIdAndUpdate({ _id: id }, { isAuthenticated: opt }, { "new": true, select: "-password" })];
                case 1:
                    user = _b.sent();
                    if (!user)
                        throw new Error("Internal server error");
                    return [2 /*return*/, user];
            }
        });
    });
};
/**
 * find a user by id and update the user's profile data
 * @param id id of the user
 * @param data data to be updated
 * @returns updated user
 * @throws 404 if no user found with the id
 * @throws 400 if the id is invalid
 */
exports.getUserByIdAndUpdate = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(data.id))
                    throw new http_errors_1["default"].BadRequest("Invalid user id");
                return [4 /*yield*/, validateUserData_1.validateProfileData(data)];
            case 1:
                _a.sent();
                return [4 /*yield*/, usersSchema_1.userModel.findByIdAndUpdate({ _id: data.id }, __assign({}, data), { "new": true })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new http_errors_1["default"].NotFound("No found with this id");
                return [2 /*return*/, true];
        }
    });
}); };
/**
 * find a user by id and update the user's password
 * @param data data to be updated
 * @returns updated user
 */
exports.getUserByIdUpdatePassword = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(data.id))
                    throw new http_errors_1["default"].BadRequest("Invalid user id");
                return [4 /*yield*/, usersSchema_1.userModel.findByIdAndUpdate({ _id: data.id }, __assign({}, data), { "new": true })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new http_errors_1["default"].NotFound("User not found");
                return [2 /*return*/, true];
        }
    });
}); };
/**
 * find a user by id and delete the user
 * @param id id of the user
 * @return deleted user
 * @throws 404 if no user found with id
 * @throws 400 if the id is invalid
 */
exports.findByIdAndDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(id))
                    throw new http_errors_1["default"].BadRequest("Invalid user id");
                return [4 /*yield*/, usersSchema_1.userModel.findByIdAndDelete({ _id: id })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new http_errors_1["default"].NotFound("No user found with this id");
                if (!(user.role === "Mentor")) return [3 /*break*/, 4];
                return [4 /*yield*/, mentor.deleteMentorData(id)];
            case 2:
                _a.sent();
                return [4 /*yield*/, mentorship.deleteAllRequest(id)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!(user.role === "Mentee")) return [3 /*break*/, 7];
                return [4 /*yield*/, mentee.deleteMenteeData(id)];
            case 5:
                _a.sent();
                return [4 /*yield*/, mentorship.deleteAllRequest(id)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, user];
        }
    });
}); };
/**
 * get all users by roles and fliter
 * by fullName, programmeOfStudy, level and sort them
 * @param filter.role - role of the user
 * @param filter.search - search string
 * @param filter.limit - limit number
 * @param filter.page - page number
 * @param filter.sort - sort queries
 * @returns mentees or mentors
 */
exports.getMentorsOrMentees = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var query, limit, page, skip, sort, options, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = __assign(__assign(__assign(__assign(__assign({}, (filter.role && { role: filter.role })), (filter.fullName && { fullName: filter.fullName })), (filter.programmeOfStudy && {
                    programmeOfStudy: filter.programmeOfStudy
                })), (filter.level && { level: filter.level })), (filter.search && {
                    $or: [
                        { fullName: { $regex: filter.search, $options: "1" } },
                        { programmeOfStudy: { $regex: filter.search, $options: "1" } },
                        { level: { $regex: filter.search, $options: "1" } },
                        { about: { $regex: filter.search, $options: "1" } },
                        { acadamicFields: { $regex: filter.search, $options: "1" } },
                    ]
                }));
                limit = helpers.getSanitizeLimit(filter.limit);
                page = helpers.getSanitizePage(filter.page);
                skip = helpers.getSanitizeOffset(limit, page);
                sort = helpers.getSanitizeSort(filter.sort);
                options = { skip: skip, lean: true, limit: limit + 1, sort: sort };
                return [4 /*yield*/, usersSchema_1.userModel.find(query, { password: 0, __v: 0 }, options)];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, helpers.getPageFormat(users, page, limit)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
