import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { ApiError } from "../utils/apiError";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized: token is missing");
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  req.user = {
    userId: new Types.ObjectId(payload.userId),
  };

  next();
};
