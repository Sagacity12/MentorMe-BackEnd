"use strict";
exports.__esModule = true;
exports.mentorshipRequestModel = void 0;
var mongoose_1 = require("mongoose");
var mentorshipRequestSchema = new mongoose_1["default"].Schema({
    mentorId: { type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    },
    menteeId: { type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User,'
    },
    status: { type: String, "default": 'pending', "enum": ['pending', 'accepted', 'rejected'] }
}, { timestamps: true });
exports.mentorshipRequestModel = mongoose_1["default"].model('MentorshipRequest', mentorshipRequestSchema);
