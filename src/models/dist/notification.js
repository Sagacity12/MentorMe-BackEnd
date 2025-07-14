"use strict";
exports.__esModule = true;
exports.notificationmodel = void 0;
var mongoose_1 = require("mongoose");
var notificationSchema = new mongoose_1["default"].Schema({
    senderId: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    status: { type: String, "default": 'unread' }
}, { timestamps: true });
exports.notificationmodel = mongoose_1["default"].model('Notifications', notificationSchema);
