import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { validateMiddleware } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateMiddleware(registerSchema),
  registerController,
);
authRouter.post("/login", validateMiddleware(loginSchema), loginController);
