import { Router } from "express";
import { authRouter } from "./auth.routes";
import { connectionRouter } from "./connection.routes";
import { profileRouter } from "./profile.routes";

export const router = Router();

router.use("/auth", authRouter);
router.use("/profiles", profileRouter);
router.use("/connections", connectionRouter);
