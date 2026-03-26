import { Router } from "express";
import {
  getMyProfileController,
  searchProfilesController,
  upsertProfileController,
} from "../controllers/profile.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateMiddleware } from "../middleware/validate.middleware";
import {
  searchProfilesSchema,
  upsertProfileSchema,
} from "../validators/profile.validator";

export const profileRouter = Router();

profileRouter.get(
  "/search",
  validateMiddleware(searchProfilesSchema),
  searchProfilesController,
);
profileRouter.get("/me", authMiddleware, getMyProfileController);
profileRouter.post(
  "/me",
  authMiddleware,
  validateMiddleware(upsertProfileSchema),
  upsertProfileController,
);
