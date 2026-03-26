import { z } from "zod";

const skillsSchema = z.array(z.string().trim().min(1)).min(1).max(30);

export const upsertProfileSchema = z.object({
  body: z.object({
    bio: z.string().trim().max(500).optional(),
    skills: skillsSchema,
    experienceYears: z.number().int().min(0).max(80).optional(),
    githubUsername: z.string().trim().max(100).optional(),
  }),
});

export const searchProfilesSchema = z.object({
  query: z.object({
    skills: z.string().optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional(),
  }),
  body: z.object({}).optional(),
  params: z.object({}).optional(),
});
