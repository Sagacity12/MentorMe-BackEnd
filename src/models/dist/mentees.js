"use strict";
exports.__esModule = true;
exports.menteeModel = void 0;
var mongoose_1 = require("mongoose");
var booksmark_1 = require("./booksmark");
var menteesSchema = new mongoose_1["default"].Schema({
    menteeId: { type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    },
    mentors: [{ type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: 'User'
        }],
    bookmarks: [booksmark_1.bookmarkSchema]
}, { timestamps: true });
exports.menteeModel = mongoose_1["default"].model('Mentee', menteesSchema);
