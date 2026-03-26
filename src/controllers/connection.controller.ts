import { Request, Response } from "express";
import { connectionService } from "../services/connection.service";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

export const sendConnectionRequestController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const connection = await connectionService.sendRequest(
      req.user.userId,
      req.params.targetUserId,
    );

    res.status(201).json({
      success: true,
      message: "Connection request sent",
      data: connection,
    });
  },
);

export const acceptConnectionRequestController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const connection = await connectionService.acceptRequest(
      req.user.userId,
      req.params.fromUserId,
    );

    res.status(200).json({
      success: true,
      message: "Connection request accepted",
      data: connection,
    });
  },
);

export const rejectConnectionRequestController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const connection = await connectionService.rejectRequest(
      req.user.userId,
      req.params.fromUserId,
    );

    res.status(200).json({
      success: true,
      message: "Connection request rejected",
      data: connection,
    });
  },
);

export const getConnectionsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const connections = await connectionService.getConnections(req.user.userId);

    res.status(200).json({
      success: true,
      data: connections,
    });
  },
);

export const getIncomingRequestsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const requests = await connectionService.getIncomingPending(
      req.user.userId,
    );

    res.status(200).json({
      success: true,
      data: requests,
    });
  },
);
