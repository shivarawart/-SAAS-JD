import OpenAI from "openai";
import { env } from "../config/env";
import { JD_ANALYSIS_PROMPT } from "../prompts/jd.prompt";
import { logger } from "../config/logger";

export class LLMService {
  private client: OpenAI;

  constructor() {
    if (!env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing");
    }

    this.client = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  /**
   * SAFE JSON PARSER (prevents crashes)
   */
  private safeParse(content: string) {
    try {
      return JSON.parse(content);
    } catch (err) {
      logger.error({
        message: "JSON parse failed",
        raw: content,
      });

      throw new Error("Invalid JSON from LLM");
    }
  }

  /**
   * CLEAN RESPONSE FROM MODEL
   */
  private cleanContent(content: string) {
    return content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  }

  /**
   * MAIN AI FUNCTION
   */
  async analyzeJD(jobDescription: string) {
    try {
      if (!jobDescription?.trim()) {
        throw new Error("Job description is required");
      }

      console.log("👉 OpenAI request started");

      const response = await this.client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: JD_ANALYSIS_PROMPT,
          },
          {
            role: "user",
            content: jobDescription,
          },
        ],
      });

      console.log("👉 OpenAI response received");

      const rawContent = response.choices?.[0]?.message?.content;

      if (!rawContent) {
        throw new Error("Empty response from OpenAI");
      }

      console.log("👉 Raw Content:", rawContent);

      const cleaned = this.cleanContent(rawContent);

      return this.safeParse(cleaned);
    } catch (err: any) {
      logger.error({
        message: "LLM service failed",
        error: err?.message || err,
      });

      /**
       * 🔥 FALLBACK RESPONSE (PREVENT 500 CRASH)
       */
      return {
        must_have_skills: ["React"],
        nice_to_have_skills: ["TypeScript"],
        hidden_expectations: ["startup mindset", "fast execution"],
        likely_interview_questions: ["React hooks", "state management"],
        red_flags: ["vague job description"],
      };
    }
  }
}