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
exports.startServer = void 0;
var http_1 = require("http");
var servers_1 = require("./servers");
var logger_1 = require("./logger");
var connectDB_1 = require("./servers/mongoDB/connectDB");
var redisConnectDB_1 = require("./servers/mongoDB/redisConnectDB");
var error_Handler_1 = require("./middlewares/error-Handler");
var http_errors_1 = require("http-errors");
var PORT = process.env.PORT || 3000;
/**
 * create the http  server here and start the server
 */
exports.startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, server, io;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectDB_1.connectDB(String(process.env.MONGO_URL))];
            case 1:
                _a.sent();
                return [4 /*yield*/, redisConnectDB_1["default"].connect()];
            case 2:
                _a.sent();
                logger_1.logger.info("Connected to Redis");
                return [4 /*yield*/, servers_1.createExpressApp()];
            case 3:
                app = _a.sent();
                // Error handlers should be placed before creating the server
                app.all("*", function (req, res, next) {
                    next(http_errors_1["default"](404, "Not Found"));
                });
                app.use(error_Handler_1["default"]);
                server = http_1["default"].createServer(app);
                return [4 /*yield*/, servers_1.createSocketServer(server)];
            case 4:
                io = _a.sent();
                server.listen(PORT, function () {
                    logger_1.logger.info("Server is running on port " + PORT);
                });
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = exports.startServer;
