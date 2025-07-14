import { Types } from "mongoose";

export interface mentorDocument {
  _id: Types.ObjectId;
  mentorId: string | Types.ObjectId;
  mentees: Array<string | Types.ObjectId>;
}

export function deleteMentorData(id: string | Types.ObjectId) {
  throw new Error("Function not implemented.");
}
