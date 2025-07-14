import mongoose from "mongoose";
import { mentorshipDocument } from "../common/interfaces/mentorship";

const mentorshipRequestSchema = new mongoose.Schema<mentorshipDocument>({
    mentorId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    menteeId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User,'
    },
    status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'] },
}, {timestamps: true });

export const mentorshipRequestModel = mongoose.model('MentorshipRequest', mentorshipRequestSchema);