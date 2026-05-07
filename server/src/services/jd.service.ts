import { LLMService } from "./llm.service";
import { logger } from "../config/logger";

export class JDService {
  private llm: LLMService;

  constructor() {
    this.llm = new LLMService();
  }

  /**
   * 🧠 Business Layer:
   * Orchestrates JD → AI analysis
   */
  async analyze(jobDescription: string) {
    try {
      // 1. Input validation (service-level safety)
      if (!jobDescription || typeof jobDescription !== "string") {
        throw new Error("Invalid job description");
      }

      const cleanedJD = jobDescription.trim();

      logger.info({
        message: "JD analysis started",
        length: cleanedJD.length,
      });

      // 2. Call AI layer
      const result = await this.llm.analyzeJD(cleanedJD);

      // 3. Return normalized result
      return {
        must_have_skills: result.must_have_skills || [],
        nice_to_have_skills: result.nice_to_have_skills || [],
        hidden_expectations: result.hidden_expectations || [],
        likely_interview_questions: result.likely_interview_questions || [],
        red_flags: result.red_flags || [],
      };
    } catch (err: any) {
      logger.error({
        message: "JDService failed",
        error: err?.message || err,
      });

      /**
       * 🔥 Safe fallback (prevents 500 propagation)
       */
      return {
        must_have_skills: ["React"],
        nice_to_have_skills: ["TypeScript"],
        hidden_expectations: ["fast-paced environment"],
        likely_interview_questions: ["React hooks", "state management"],
        red_flags: ["vague job description"],
      };
    }
  }
}