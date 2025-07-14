"use strict";
exports.__esModule = true;
exports.authModel = void 0;
var mongoose_1 = require("mongoose");
var authSchema = new mongoose_1["default"].Schema({
    userId: { type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: { type: String,
        required: true
    },
    expiresIn: { type: Date,
        required: true
    }
}, { timestamps: true });
exports.authModel = mongoose_1["default"].model('Auth', authSchema);
