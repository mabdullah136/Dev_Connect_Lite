import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { signToken } from "../utils/jwt";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

const sanitizeUser = (user: { _id: unknown; name: string; email: string }) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
});

export const authService = {
  async register(input: RegisterInput) {
    const existing = await User.findOne({ email: input.email });
    if (existing) {
      throw new ApiError(409, "Email is already registered");
    }

    const user = await User.create(input);
    const token = signToken({ userId: String(user._id) });

    return {
      token,
      user: sanitizeUser(user),
    };
  },

  async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(input.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = signToken({ userId: String(user._id) });

    return {
      token,
      user: sanitizeUser(user),
    };
  },
};
