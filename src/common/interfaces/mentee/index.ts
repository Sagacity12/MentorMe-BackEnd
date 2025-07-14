import { Types } from "mongoose";
import { bookmarkDocument } from "../bookmark/book";

export interface menteeDocument {
    _id: Types.ObjectId 
    menteeId: string | Types.ObjectId
    mentors: Array<string | Types.ObjectId>
    bookmarks: bookmarkDocument 
}

export function deleteMenteeData( id: string | Types.ObjectId ) {
    throw new Error("Function not implemeted");
}