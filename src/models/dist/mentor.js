"use strict";
exports.__esModule = true;
exports.mentorModel = void 0;
var mongoose_1 = require("mongoose");
var mentorschema = new mongoose_1["default"].Schema({
    mentorId: { type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    },
    mentees: [{ type: mongoose_1["default"].Schema.Types.ObjectId }]
}, { timestamps: true });
exports.mentorModel = mongoose_1["default"].model('Mentor', mentorschema);
