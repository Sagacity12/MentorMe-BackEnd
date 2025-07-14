import mongoose from "mongoose"; 
import { bookmarkDocument } from "../common/interfaces/bookmark/book";

export const bookmarkSchema = new mongoose.Schema<bookmarkDocument>({
    resourcesId: [{ type: mongoose.Schema.Types.ObjectId }]
});