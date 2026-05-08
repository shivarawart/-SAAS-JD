/**
 * 🎯 Domain Classifier (Production Grade)
 * --------------------------------------
 * Detects career domain from user input
 * Used to route requests to correct AI prompt
 */

export type CareerDomain =
  | "AI_ML"
  | "DATA_ANALYTICS"
  | "FRONTEND"
  | "BACKEND"
  | "MARKETING"
  | "DEVOPS"
  | "GENERAL";

export class DomainClassifier {
  /**
   * Normalize input
   */
  private normalize(text: string): string {
    return text.toLowerCase().trim();
  }

  /**
   * Keyword maps for each domain
   * (You can expand this anytime without breaking system)
   */
  private rules: Record<CareerDomain, string[]> = {
    AI_ML: [
      "ai",
      "ml",
      "machine learning",
      "deep learning",
      "llm",
      "pytorch",
      "tensorflow",
      "data science",
      "neural network",
    ],

    DATA_ANALYTICS: [
      "data analyst",
      "data science",
      "sql",
      "power bi",
      "tableau",
      "excel",
      "analytics",
      "data visualization",
    ],

    FRONTEND: [
      "frontend",
      "react",
      "next.js",
      "ui",
      "css",
      "html",
      "tailwind",
      "javascript",
    ],

    BACKEND: [
      "backend",
      "api",
      "node",
      "express",
      "database",
      "postgres",
      "mongodb",
      "microservices",
    ],

    MARKETING: [
      "marketing",
      "seo",
      "content",
      "ads",
      "growth",
      "social media",
      "branding",
    ],

    DEVOPS: [
      "devops",
      "docker",
      "kubernetes",
      "ci/cd",
      "aws",
      "cloud",
      "deployment",
    ],

    GENERAL: [],
  };

  /**
   * Main detection logic
   */
  public detect(input: string): CareerDomain {
    const text = this.normalize(input);

    let bestMatch: CareerDomain = "GENERAL";
    let maxScore = 0;

    for (const [domain, keywords] of Object.entries(this.rules)) {
      let score = 0;

      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          score++;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatch = domain as CareerDomain;
      }
    }

    return bestMatch;
  }
}

/**
 * Singleton helper (clean usage)
 */
export const domainClassifier = new DomainClassifier();