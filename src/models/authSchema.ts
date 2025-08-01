import mongoose from "mongoose";
import { Auth } from "../common/interfaces/auth";

const authSchema = new mongoose.Schema<Auth>({
    userId: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
         required: true 
        },
    token: { type: String, 
        required: true 
         },
    expiresIn: { type: Date,
        required: true
         },
}, { timestamps: true });

export const authModel = mongoose.model('Auth', authSchema);