"use strict";
exports.__esModule = true;
exports.bookmarkSchema = void 0;
var mongoose_1 = require("mongoose");
exports.bookmarkSchema = new mongoose_1["default"].Schema({
    resourcesId: [{ type: mongoose_1["default"].Schema.Types.ObjectId }]
});
