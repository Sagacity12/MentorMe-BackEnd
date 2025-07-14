import mongoose from "mongoose"; 
import { message } from '../common/interfaces/message';

export const messagesSchema = new mongoose.Schema<message>({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    delivered: { type: Boolean }
}, { timestamps: true});