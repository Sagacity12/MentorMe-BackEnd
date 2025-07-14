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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const http_1 = __importDefault(require("http"));
const servers_1 = require("./servers");
const logger_1 = require("./logger");
const http_errors_1 = __importDefault(require("http-errors"));
const PORT = process.env.PORT || 3000;
/**
 * create the http  server here and start the server
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = yield (0, servers_1.createExpressApp)();
    const server = http_1.default.createServer(app);
    const io = yield (0, servers_1.createSocketServer)(server);
    app.all("*", (req, res, next) => {
        next((0, http_errors_1.default)(404, "Not Found"));
    });
    server.listen(PORT, () => {
        logger_1.logger.info(`Server is running on port ${PORT}`);
    });
});
exports.startServer = startServer;
exports.default = exports.startServer;
