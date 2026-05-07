import { z } from "zod";

/**
 * Incoming request validation
 * This prevents garbage input from reaching AI layer
 */
export const JDRequestSchema = z.object({
  job_description: z
    .string()
    .min(20, "Job description too short")
    .max(20000, "Job description too large"),
});

/**
 * Strict output schema for AI response validation
 */
export const JDResponseSchema = z.object({
  must_have_skills: z.array(z.string()),
  nice_to_have_skills: z.array(z.string()),
  hidden_expectations: z.array(z.string()),
  likely_interview_questions: z.array(z.string()),
  red_flags: z.array(z.string()),
});

export type JDRequest = z.infer<typeof JDRequestSchema>;
export type JDResponse = z.infer<typeof JDResponseSchema>;