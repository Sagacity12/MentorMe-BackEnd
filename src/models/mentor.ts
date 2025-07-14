import mongoose from 'mongoose';
import { mentorDocument } from '../common/interfaces/mentor/index';

const mentorschema = new mongoose.Schema<mentorDocument>({
    mentorId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mentees: [{ type: mongoose.Schema.Types.ObjectId,}]
}, { timestamps: true});

export const mentorModel = mongoose.model('Mentor', mentorschema);