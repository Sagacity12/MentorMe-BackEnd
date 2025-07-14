"use strict";
exports.__esModule = true;
exports.resourceModel = void 0;
var mongoose_1 = require("mongoose");
var resourceSchema = new mongoose_1["default"].Schema({
    uploadedBy: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    resources_url: { type: String, required: true },
    forward_to_mentees: { type: mongoose_1["default"].Types.ObjectId, ref: 'User' }
}, { timestamps: true });
exports.resourceModel = mongoose_1["default"].model('resources', resourceSchema);
