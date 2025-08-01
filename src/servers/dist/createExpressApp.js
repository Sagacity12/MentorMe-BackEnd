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
exports.createExpressApp = void 0;
var express_1 = require("express");
var express_rate_limit_1 = require("express-rate-limit");
var express_session_1 = require("express-session");
var connect_mongodb_session_1 = require("connect-mongodb-session");
var helmet_1 = require("helmet");
//import xss from 'xss-clean'; 
// Simple logger using console, replace with your preferred logger if needed
var logger = {
    error: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.error.apply(console, args);
    }
};
var helmetOptions = {
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
};
var limiter = express_rate_limit_1["default"]({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false
});
exports.createExpressApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, mongoStore, mongoUrl, store, sessionSecret;
    return __generator(this, function (_a) {
        app = express_1["default"]();
        mongoStore = connect_mongodb_session_1["default"](express_session_1["default"]);
        mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL environment variable is not defined');
        }
        store = new mongoStore({
            uri: mongoUrl,
            collection: 'sessions'
        });
        store.on("error", function (err) { return logger.error(err); });
        app.set('trust proxy', 1); // Trust first proxy, useful if behind a reverse proxy
        app.use(express_1["default"].json({ limit: "50mb" }));
        app.use(limiter);
        app.use(helmet_1["default"](helmetOptions));
        app.use(helmet_1["default"].hidePoweredBy());
        //Reason... this because there was an error with the x-powered-by header and this required a middleware function to be used
        //app.use("x-powered-by");
        //app.use(xss()); // Prevent XSS attacks
        app.use(express_1["default"].urlencoded({ extended: true }));
        sessionSecret = process.env.SESSION_SECRET;
        if (!sessionSecret) {
            throw new Error('SESSION_SECRET environment variable is not defined');
        }
        app.use(express_session_1["default"]({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
            store: store
        }));
        return [2 /*return*/, app];
    });
}); };
