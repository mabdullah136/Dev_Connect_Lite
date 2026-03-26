import { Types } from "mongoose";
import {
  ConnectionRequest,
  ConnectionStatus,
} from "../models/connectionRequest.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";

const ensureUserExists = async (userId: Types.ObjectId): Promise<void> => {
  const user = await User.exists({ _id: userId });
  if (!user) {
    throw new ApiError(404, "Target user not found");
  }
};

export const connectionService = {
  async sendRequest(currentUserId: Types.ObjectId, targetUserIdRaw: string) {
    const targetUserId = new Types.ObjectId(targetUserIdRaw);

    if (String(currentUserId) === String(targetUserId)) {
      throw new ApiError(400, "Cannot send connection request to yourself");
    }

    await ensureUserExists(targetUserId);

    const reverseAccepted = await ConnectionRequest.findOne({
      fromUser: targetUserId,
      toUser: currentUserId,
      status: "accepted",
    });

    if (reverseAccepted) {
      throw new ApiError(409, "You are already connected");
    }

    const existing = await ConnectionRequest.findOne({
      fromUser: currentUserId,
      toUser: targetUserId,
    });

    if (existing) {
      throw new ApiError(409, "Connection request already exists");
    }

    return ConnectionRequest.create({
      fromUser: currentUserId,
      toUser: targetUserId,
      status: "pending" as ConnectionStatus,
    });
  },

  async acceptRequest(currentUserId: Types.ObjectId, fromUserIdRaw: string) {
    const fromUserId = new Types.ObjectId(fromUserIdRaw);

    const request = await ConnectionRequest.findOne({
      fromUser: fromUserId,
      toUser: currentUserId,
      status: "pending",
    });

    if (!request) {
      throw new ApiError(404, "Pending request not found");
    }

    request.status = "accepted";
    await request.save();
    return request;
  },

  async rejectRequest(currentUserId: Types.ObjectId, fromUserIdRaw: string) {
    const fromUserId = new Types.ObjectId(fromUserIdRaw);

    const request = await ConnectionRequest.findOne({
      fromUser: fromUserId,
      toUser: currentUserId,
      status: "pending",
    });

    if (!request) {
      throw new ApiError(404, "Pending request not found");
    }

    request.status = "rejected";
    await request.save();
    return request;
  },

  async getConnections(currentUserId: Types.ObjectId) {
    const accepted = await ConnectionRequest.find({
      status: "accepted",
      $or: [{ fromUser: currentUserId }, { toUser: currentUserId }],
    })
      .populate("fromUser", "name email")
      .populate("toUser", "name email")
      .sort({ updatedAt: -1 });

    return accepted.map((connection) => {
      const isSender =
        String(connection.fromUser._id) === String(currentUserId);
      return {
        connectionId: String(connection._id),
        connectedAt: connection.updatedAt,
        user: isSender ? connection.toUser : connection.fromUser,
      };
    });
  },

  async getIncomingPending(currentUserId: Types.ObjectId) {
    return ConnectionRequest.find({
      toUser: currentUserId,
      status: "pending",
    })
      .populate("fromUser", "name email")
      .sort({ createdAt: -1 });
  },
};
