import { z } from "zod";

export const targetUserSchema = z.object({
  params: z.object({
    targetUserId: z.string().length(24),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const fromUserSchema = z.object({
  params: z.object({
    fromUserId: z.string().length(24),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});
