import { Router } from "express";
import {
  acceptConnectionRequestController,
  getConnectionsController,
  getIncomingRequestsController,
  rejectConnectionRequestController,
  sendConnectionRequestController,
} from "../controllers/connection.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateMiddleware } from "../middleware/validate.middleware";
import {
  fromUserSchema,
  targetUserSchema,
} from "../validators/connection.validator";

export const connectionRouter = Router();

connectionRouter.use(authMiddleware);

connectionRouter.get("/", getConnectionsController);
connectionRouter.get("/incoming", getIncomingRequestsController);
connectionRouter.post(
  "/request/:targetUserId",
  validateMiddleware(targetUserSchema),
  sendConnectionRequestController,
);
connectionRouter.patch(
  "/accept/:fromUserId",
  validateMiddleware(fromUserSchema),
  acceptConnectionRequestController,
);
connectionRouter.patch(
  "/reject/:fromUserId",
  validateMiddleware(fromUserSchema),
  rejectConnectionRequestController,
);
