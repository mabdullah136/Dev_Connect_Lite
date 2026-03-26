import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { profileService } from "../services/profile.service";

export const upsertProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const profile = await profileService.upsertProfile(
      req.user.userId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: profile,
    });
  },
);

export const getMyProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const profile = await profileService.getMyProfile(req.user.userId);
    if (!profile) {
      throw new ApiError(404, "Profile not found");
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  },
);

export const searchProfilesController = asyncHandler(
  async (req: Request, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const skills =
      typeof req.query.skills === "string" ? req.query.skills : undefined;

    const result = await profileService.searchProfiles(skills, page, limit);

    res.status(200).json({
      success: true,
      data: result.items,
      pagination: result.pagination,
    });
  },
);
