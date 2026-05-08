import OpenAI from "openai";
import { env } from "../config/env";
import { logger } from "../config/logger";
import {
  CareerAnalysisSchema,
  type CareerAnalysisResponse,
} from "../schemas/career.schema";
import { CAREER_ANALYSIS_PROMPT } from "../prompts/career.prompt";

type Domain =
  | "AI_ENGINEERING"
  | "DATA_SCIENCE"
  | "DATA_ANALYTICS"
  | "FRONTEND"
  | "BACKEND"
  | "DEVOPS"
  | "SOFTWARE_ENGINEERING";

export class CareerAIService {
  private client: OpenAI;

  constructor() {
    if (!env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY missing");
    }

    this.client = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  /**
   * CLEAN RESPONSE
   */
  private clean(content: string) {
    return content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\\n/g, "")
      .trim();
  }

  /**
   * DOMAIN DETECTOR (STABLE)
   */
  private detectDomain(input: string): Domain {
    const text = input.toLowerCase();

    const has = (arr: string[]) =>
      arr.some((k) => text.includes(k));

    if (
      has([
        "ai",
        "machine learning",
        "deep learning",
        "llm",
        "nlp",
        "transformer",
        "pytorch",
      ])
    )
      return "AI_ENGINEERING";

    if (
      has([
        "data science",
        "data scientist",
        "pandas",
        "numpy",
      ])
    )
      return "DATA_SCIENCE";

    if (
      has([
        "data analyst",
        "analytics",
        "sql",
        "tableau",
        "power bi",
      ])
    )
      return "DATA_ANALYTICS";

    if (
      has([
        "frontend",
        "react",
        "next.js",
        "ui",
        "typescript",
      ])
    )
      return "FRONTEND";

    if (
      has([
        "backend",
        "node",
        "api",
        "express",
        "bun",
      ])
    )
      return "BACKEND";

    if (
      has([
        "devops",
        "docker",
        "kubernetes",
        "aws",
      ])
    )
      return "DEVOPS";

    return "SOFTWARE_ENGINEERING";
  }

  /**
   * SAFE PARSER
   */
  private safeParse(content: string) {
    try {
      return JSON.parse(content);
    } catch (err) {
      logger.error({
        message: "JSON parse failed",
        raw: content,
      });

      throw new Error("Invalid AI response format");
    }
  }

  /**
   * DOMAIN VALIDATION GUARD (IMPORTANT FIX)
   */
  private validateDomainLeak(domain: Domain, data: any) {
    const text = JSON.stringify(data).toLowerCase();

    if (domain === "AI_ENGINEERING") {
      if (text.includes("react")) {
        throw new Error("Domain leak: frontend in AI response");
      }
    }

    if (domain === "FRONTEND") {
      if (text.includes("pytorch")) {
        throw new Error("Domain leak: ML in frontend response");
      }
    }

    return data;
  }

  /**
   * SMART FALLBACK (SAFE + CLEAN)
   */
  private fallback(domain: Domain) {
    const base = {
      career_target: domain,
      detected_domain: domain,
      required_skills: [],
      advanced_skills: [],
      learning_roadmap: [],
      recommended_projects: [],
      best_free_resources: [],
      best_paid_resources: [],
      recommended_certifications: [],
      resume_improvements: [],
      hidden_industry_expectations: [],
      common_mistakes: [],
      estimated_learning_timeline: "",
    };

    const map: Record<Domain, any> = {
      AI_ENGINEERING: {
        required_skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
          "PyTorch",
        ],
        advanced_skills: [
          "RAG",
          "Vector DBs",
          "LLMs",
        ],
        learning_roadmap: [
          "Python",
          "ML Fundamentals",
          "Deep Learning",
          "LLM Systems",
        ],
      },

      DATA_SCIENCE: {
        required_skills: [
          "Python",
          "SQL",
          "Statistics",
          "Pandas",
        ],
        learning_roadmap: [
          "Python",
          "Statistics",
          "Data Analysis",
          "ML Basics",
        ],
      },

      FRONTEND: {
        required_skills: [
          "React",
          "JavaScript",
          "TypeScript",
        ],
        learning_roadmap: [
          "HTML/CSS",
          "JavaScript",
          "React",
          "System Design UI",
        ],
      },

      BACKEND: {
        required_skills: [
          "Node.js",
          "APIs",
          "Databases",
        ],
        learning_roadmap: [
          "Node.js",
          "APIs",
          "Databases",
          "System Design",
        ],
      },

      DEVOPS: {
        required_skills: [
          "Docker",
          "Kubernetes",
          "AWS",
        ],
        learning_roadmap: [
          "Linux",
          "Docker",
          "Cloud",
          "CI/CD",
        ],
      },

      DATA_ANALYTICS: {
        required_skills: [
          "SQL",
          "Excel",
          "Power BI",
        ],
        learning_roadmap: [
          "SQL",
          "Excel",
          "Dashboards",
        ],
      },

      SOFTWARE_ENGINEERING: {
        required_skills: [
          "Problem Solving",
          "DSA",
        ],
        learning_roadmap: [
          "DSA",
          "Projects",
          "System Design",
        ],
      },
    };

    return {
      ...base,
      ...map[domain],
    };
  }

  /**
   * MAIN CAREER BRAIN v2 (FIXED)
   */
  async analyze(input: string): Promise<CareerAnalysisResponse> {
    const domain = this.detectDomain(input);

    try {
      if (!input?.trim()) {
        throw new Error("Input is empty");
      }

      logger.info({
        message: "Career Brain v2.1 started",
        domain,
      });

      const response = await this.client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,

        messages: [
          {
            role: "system",
            content: `
${CAREER_ANALYSIS_PROMPT}

STRICT RULE:
You MUST stay inside this domain ONLY: ${domain}

Think step-by-step:
1. Identify skills
2. Filter irrelevant tech
3. Focus ONLY domain-relevant knowledge
4. Return structured JSON
            `,
          },
          {
            role: "user",
            content: `
DOMAIN: ${domain}

USER INPUT:
${input}
            `,
          },
        ],
      });

      const raw = response.choices?.[0]?.message?.content;

      if (!raw) throw new Error("Empty AI response");

      const cleaned = this.clean(raw);
      const parsed = this.safeParse(cleaned);

      const validated =
        CareerAnalysisSchema.parse(parsed);

      return this.validateDomainLeak(domain, validated);
    } catch (err: any) {
      logger.error({
        message: "Career Brain failed",
        error: err?.message || err,
      });

      return this.fallback(domain);
    }
  }
}