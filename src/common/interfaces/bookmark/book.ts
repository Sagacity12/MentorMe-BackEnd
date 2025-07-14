import { Types } from "mongoose";


export interface bookmarkDocument {
    _id: Types.ObjectId
    resourcesId: string[] | Types.ObjectId[]
}