import { Schema, Types, model } from "mongoose";

export type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface IConnectionRequest {
  fromUser: Types.ObjectId;
  toUser: Types.ObjectId;
  status: ConnectionStatus;
  createdAt: Date;
  updatedAt: Date;
}

const connectionRequestSchema = new Schema<IConnectionRequest>(
  {
    fromUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

export const ConnectionRequest = model<IConnectionRequest>(
  "ConnectionRequest",
  connectionRequestSchema,
);
