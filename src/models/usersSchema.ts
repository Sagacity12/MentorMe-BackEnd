import mongoose from "mongoose";
import { userDocument } from "../common/interfaces/user";

const usersSchema = new mongoose.Schema<userDocument>({
    fullName: {type: String,
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
    isAuthenticated: { type: Boolean, default: false }
}, { timestamps: true });

export const userModel = mongoose.model('User', usersSchema);