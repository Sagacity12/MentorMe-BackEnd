import mongoose from "mongoose";
import { messageDocument } from "../common/interfaces/message";
import { messagesSchema } from "./messageSchema";

const messageSchema = new mongoose.Schema<messageDocument>({
    messagesIds: { type: String, required: true },
    messages: [messagesSchema]
})

export const messageModel = mongoose.model('messages', messageSchema);
