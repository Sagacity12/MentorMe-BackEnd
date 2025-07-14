"use strict";
exports.__esModule = true;
exports.userModel = void 0;
var mongoose_1 = require("mongoose");
var usersSchema = new mongoose_1["default"].Schema({
    fullName: { type: String,
        maxLenght: 100
    },
    profile_url: { type: String },
    phone: { type: String,
        required: true
    },
    email: { type: String },
    role: { type: String },
    programmeOfStudy: { type: String },
    level: { type: String },
    about: { type: String, maxLenght: 250 },
    academicFields: [{ type: Boolean }],
    password: { type: String },
    isAuthenticated: { type: Boolean, "default": false }
}, { timestamps: true });
exports.userModel = mongoose_1["default"].model('User', usersSchema);
