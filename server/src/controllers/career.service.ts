import { CareerAIService } from "../services/career-ai.service";
import { logger } from "../config/logger";

export class CareerService {
  private ai: CareerAIService;

  constructor() {
    this.ai = new CareerAIService();
  }

  /**
   * DOMAIN VALIDATION LAYER (prevents garbage input)
   */
  private validateInput(input: string) {
    if (!input || typeof input !== "string") {
      throw new Error("Invalid input");
    }

    const cleaned = input.trim();

    if (cleaned.length < 10) {
      throw new Error("Input too short for meaningful analysis");
    }

    return cleaned;
  }

  /**
   * INTELLIGENCE ENRICHMENT LAYER
   * (THIS FIXES YOUR “same output problem”)
   */
  private enrichResult(result: any, input: string) {
    const text = input.toLowerCase();

    let domain = "Software Engineering";

    if (text.includes("ai") || text.includes("ml")) {
      domain = "AI Engineering";
    } else if (text.includes("data")) {
      domain = "Data Science";
    } else if (text.includes("frontend") || text.includes("react")) {
      domain = "Frontend Engineering";
    } else if (text.includes("backend")) {
      domain = "Backend Engineering";
    }

    return {
      ...result,

      // FORCE DOMAIN CONSISTENCY
      detected_domain: domain,

      // ADD INTELLIGENCE SIGNAL
      system_version: "career-brain-v3",

      // BASIC SCORE (you can upgrade later)
      confidence_score: this.calculateConfidence(domain),
    };
  }

  /**
   * SIMPLE SCORING ENGINE (VERY IMPORTANT)
   */
  private calculateConfidence(domain: string) {
    const scores: Record<string, number> = {
      "AI Engineering": 85,
      "Data Science": 80,
      "Frontend Engineering": 90,
      "Backend Engineering": 88,
      "Software Engineering": 75,
    };

    return scores[domain] || 70;
  }

  /**
   * MAIN SERVICE FUNCTION
   */
  async analyzeCareer(input: string) {
    try {
      const cleanedInput = this.validateInput(input);

      logger.info({
        message: "Career analysis started",
        inputLength: cleanedInput.length,
      });

      /**
       * STEP 1: AI ANALYSIS
       */
      const result = await this.ai.analyze(cleanedInput);

      /**
       * STEP 2: INTELLIGENCE ENRICHMENT
       */
      const enriched = this.enrichResult(result, cleanedInput);

      return enriched;
    } catch (err: any) {
      logger.error({
        message: "CareerService failed",
        error: err?.message || err,
      });

      throw new Error("Career analysis failed");
    }
  }
}