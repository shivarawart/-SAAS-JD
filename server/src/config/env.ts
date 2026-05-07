import { z } from "zod";
import "dotenv/config";

/**
 * Environment Schema (safe & production-ready)
 */
const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  NODE_ENV: z.string().optional().default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);

  throw new Error("Environment validation failed");
}


export const env: {
  OPENAI_API_KEY: string;
  NODE_ENV: string;
} = parsed.data;
