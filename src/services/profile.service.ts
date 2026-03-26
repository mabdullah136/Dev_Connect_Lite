import { Types } from "mongoose";
import { Profile } from "../models/profile.model";

export type UpsertProfileInput = {
  bio?: string;
  skills: string[];
  experienceYears?: number;
  githubUsername?: string;
};

const normalizeSkills = (skills: string[]): string[] => [
  ...new Set(skills.map((skill) => skill.trim().toLowerCase()).filter(Boolean)),
];

export const profileService = {
  async upsertProfile(userId: Types.ObjectId, input: UpsertProfileInput) {
    const payload = {
      ...input,
      skills: normalizeSkills(input.skills),
    };

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: payload },
      { upsert: true, new: true, runValidators: true },
    ).populate("user", "name email");

    return profile;
  },

  async getMyProfile(userId: Types.ObjectId) {
    return Profile.findOne({ user: userId }).populate("user", "name email");
  },

  async searchProfiles(skillsCsv: string | undefined, page = 1, limit = 10) {
    const skills = skillsCsv
      ? skillsCsv
          .split(",")
          .map((skill) => skill.trim().toLowerCase())
          .filter(Boolean)
      : [];

    const filter = skills.length ? { skills: { $all: skills } } : {};

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Profile.find(filter)
        .populate("user", "name email")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      Profile.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },
};
