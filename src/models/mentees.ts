import mongoose from "mongoose"; 
import { bookmarkSchema } from "./booksmark";
import { menteeDocument } from "../common/interfaces/mentee/index";

const menteesSchema = new mongoose.Schema<menteeDocument>({
    menteeId: { type: mongoose.Schema.Types.ObjectId,
        ref:  'User',
    },
    mentors: [{ type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    bookmarks: [bookmarkSchema],
}, { timestamps: true});

export const menteeModel = mongoose.model('Mentee', menteesSchema);