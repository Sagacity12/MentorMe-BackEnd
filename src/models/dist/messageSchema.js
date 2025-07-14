"use strict";
exports.__esModule = true;
exports.messagesSchema = void 0;
var mongoose_1 = require("mongoose");
exports.messagesSchema = new mongoose_1["default"].Schema({
    senderId: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    delivered: { type: Boolean }
}, { timestamps: true });
