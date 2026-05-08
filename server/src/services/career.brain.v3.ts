import OpenAI from "openai";
import { env } from "../config/env";
import { logger } from "../config/logger";

export class CareerBrainV3 {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  /**
   * DOMAIN DETECTION (reuse your logic)
   */
  private detectDomain(input: string) {
    const text = input.toLowerCase();

    if (text.includes("ai") || text.includes("ml")) return "AI";
    if (text.includes("data")) return "Data";
    if (text.includes("frontend") || text.includes("react")) return "Frontend";
    if (text.includes("backend") || text.includes("api")) return "Backend";

    return "Software";
  }

  /**
   * HIREABILITY SCORE ENGINE (RULE + AI HYBRID)
   */
  private calculateBaseScore(domain: string) {
    const base = {
      AI: 65,
      Data: 60,
      Frontend: 70,
      Backend: 68,
      Software: 60,
    };

    return base[domain as keyof typeof base] || 60;
  }

  /**
   * MAIN BRAIN FUNCTION
   */
  async analyze(input: string) {
    const domain = this.detectDomain(input);

    try {
      logger.info({
        message: "Career Brain v3 activated",
        domain,
      });

      const baseScore = this.calculateBaseScore(domain);

      const response = await this.client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `
You are Career Brain v3.

Return ONLY JSON:

{
  "career_path": string[],
  "skill_gaps": string[],
  "must_learn_priority": string[],
  "interview_questions": string[],
  "projects": string[],
  "resume_improvements": string[]
}
`,
          },
          {
            role: "user",
            content: input,
          },
        ],
      });

      const raw = response.choices?.[0]?.message?.content;

      if (!raw) throw new Error("Empty response");

      const cleaned = raw.replace(/```json|```/g, "").trim();

      const parsed = JSON.parse(cleaned);

      /**
       * ADD INTELLIGENCE LAYER
       */
      return {
        domain,
        hireability_score: baseScore,
        ...parsed,
      };
    } catch (err: any) {
      logger.error({
        message: "Career Brain v3 failed",
        error: err?.message,
      });

      return {
        domain,
        hireability_score: 60,
        career_path: ["Learn fundamentals", "Build projects"],
        skill_gaps: ["System Design"],
        must_learn_priority: ["JavaScript", "React"],
        interview_questions: ["Tell me about yourself"],
        projects: ["Build SaaS app"],
        resume_improvements: ["Add real projects"],
      };
    }
  }
}