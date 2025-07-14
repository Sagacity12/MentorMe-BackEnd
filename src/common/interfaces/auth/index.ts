import { Types } from "mongoose";

export interface Auth {
    _id: Types.ObjectId;
    userId: string | Types.ObjectId 
    token: string 
    expiresIn: Date
}