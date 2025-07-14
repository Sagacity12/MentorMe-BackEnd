"use strict";
exports.__esModule = true;
exports.messageModel = void 0;
var mongoose_1 = require("mongoose");
var messageSchema_1 = require("./messageSchema");
var messageSchema = new mongoose_1["default"].Schema({
    messagesIds: { type: String, required: true },
    messages: [messageSchema_1.messagesSchema]
});
exports.messageModel = mongoose_1["default"].model('messages', messageSchema);
