import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  },
);
