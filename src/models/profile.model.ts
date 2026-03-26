import { Schema, Types, model } from "mongoose";

export interface IProfile {
  user: Types.ObjectId;
  bio?: string;
  skills: string[];
  experienceYears?: number;
  githubUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: { type: String, trim: true },
    skills: [{ type: String, required: true, trim: true, lowercase: true }],
    experienceYears: { type: Number, min: 0 },
    githubUsername: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

profileSchema.index({ skills: 1 });

export const Profile = model<IProfile>("Profile", profileSchema);
