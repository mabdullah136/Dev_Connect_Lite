import bcrypt from "bcryptjs";
import { Model, Schema, model } from "mongoose";
import { env } from "../config/env";

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function onSave(next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  this.password = await bcrypt.hash(this.password, env.bcryptSaltRounds);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(
  password: string,
) {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser, UserModel>("User", userSchema);
