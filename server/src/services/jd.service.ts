import { LLMService } from "./llm.service";
import { logger } from "../config/logger";

type Domain =
  | "AI Engineering"
  | "Data Science"
  | "Data Analytics"
  | "Frontend Engineering"
  | "Backend Engineering"
  | "DevOps"
  | "Software Engineering";

export class JDService {
  private llm: LLMService;

  constructor() {
    this.llm = new LLMService();
  }

  /**
   * NORMALIZE TEXT
   */
  private normalize(text: string): string {
    return text.toLowerCase().replace(/\s+/g, " ").trim();
  }

  /**
   * DOMAIN DETECTOR (PRODUCTION SAFE)
   */
  private detectDomain(input: string): Domain {
    const text = this.normalize(input);

    const match = (keys: string[]) =>
      keys.some((k) => text.includes(k));

    if (
      match([
        "ai",
        "machine learning",
        "deep learning",
        "llm",
        "nlp",
        "transformer",
        "pytorch",
      ])
    )
      return "AI Engineering";

    if (
      match([
        "data science",
        "data scientist",
        "pandas",
        "numpy",
      ])
    )
      return "Data Science";

    if (
      match([
        "data analyst",
        "analytics",
        "power bi",
        "tableau",
        "sql",
      ])
    )
      return "Data Analytics";

    if (
      match([
        "frontend",
        "react",
        "next.js",
        "ui",
        "typescript",
      ])
    )
      return "Frontend Engineering";

    if (
      match([
        "backend",
        "node",
        "api",
        "server",
        "express",
        "bun",
      ])
    )
      return "Backend Engineering";

    if (
      match([
        "devops",
        "docker",
        "kubernetes",
        "aws",
        "ci/cd",
      ])
    )
      return "DevOps";

    return "Software Engineering";
  }

  /**
   * RESPONSE VALIDATION (STRICT)
   */
  private validate(result: any) {
    if (!result || typeof result !== "object") {
      throw new Error("Invalid AI response format");
    }

    const requiredKeys = [
      "must_have_skills",
      "nice_to_have_skills",
      "hidden_expectations",
      "likely_interview_questions",
      "red_flags",
    ];

    for (const key of requiredKeys) {
      if (!Array.isArray(result[key])) {
        throw new Error(`Missing or invalid field: ${key}`);
      }
    }

    return result;
  }

  /**
   * DOMAIN FALLBACK (SAFE BUT SMART)
   */
  private fallback(domain: Domain) {
    const base = {
      must_have_skills: [],
      nice_to_have_skills: [],
      hidden_expectations: [],
      likely_interview_questions: [],
      red_flags: [],
    };

    const map: Record<Domain, any> = {
      "AI Engineering": {
        must_have_skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
          "PyTorch",
          "Transformers",
        ],
        nice_to_have_skills: [
          "RAG",
          "Vector Databases",
          "MLOps",
        ],
        hidden_expectations: [
          "Strong experimentation mindset",
        ],
        likely_interview_questions: [
          "Explain transformers architecture",
          "What is overfitting?",
        ],
        red_flags: ["No ML fundamentals"],
      },

      "Data Science": {
        must_have_skills: [
          "Python",
          "SQL",
          "Statistics",
          "Pandas",
          "NumPy",
        ],
        nice_to_have_skills: ["Machine Learning"],
        hidden_expectations: ["Business thinking"],
        likely_interview_questions: [
          "Explain regression",
        ],
        red_flags: ["Weak statistics"],
      },

      "Data Analytics": {
        must_have_skills: [
          "SQL",
          "Excel",
          "Data Visualization",
        ],
        nice_to_have_skills: [
          "Power BI",
          "Tableau",
        ],
        hidden_expectations: [
          "Attention to detail",
        ],
        likely_interview_questions: [
          "How do you analyze datasets?",
        ],
        red_flags: ["No SQL experience"],
      },

      "Frontend Engineering": {
        must_have_skills: [
          "React",
          "JavaScript",
          "TypeScript",
        ],
        nice_to_have_skills: [
          "Next.js",
          "Performance optimization",
        ],
        hidden_expectations: [
          "Ownership mindset",
        ],
        likely_interview_questions: [
          "Explain React reconciliation",
        ],
        red_flags: ["Only tutorial projects"],
      },

      "Backend Engineering": {
        must_have_skills: [
          "Node.js",
          "APIs",
          "Databases",
        ],
        nice_to_have_skills: [
          "Microservices",
          "Caching",
        ],
        hidden_expectations: [
          "System thinking",
        ],
        likely_interview_questions: [
          "Design REST API",
        ],
        red_flags: ["No system design"],
      },

      "DevOps": {
        must_have_skills: [
          "Docker",
          "Kubernetes",
          "CI/CD",
        ],
        nice_to_have_skills: [
          "AWS",
          "Terraform",
        ],
        hidden_expectations: [
          "Infrastructure mindset",
        ],
        likely_interview_questions: [
          "Explain CI/CD pipeline",
        ],
        red_flags: ["No cloud exposure"],
      },

      "Software Engineering": {
        must_have_skills: [
          "Problem Solving",
          "DSA",
        ],
        nice_to_have_skills: ["System Design"],
        hidden_expectations: ["Fast learning"],
        likely_interview_questions: [
          "Tell me about a project",
        ],
        red_flags: ["No real experience"],
      },
    };

    return {
      ...base,
      ...map[domain],
      detected_domain: domain,
    };
  }

  /**
   * MAIN FUNCTION (PRODUCTION READY)
   */
  async analyze(jobDescription: string) {
    const domain = this.detectDomain(jobDescription);

    try {
      if (!jobDescription?.trim()) {
        throw new Error("Invalid job description");
      }

      const cleanedJD = jobDescription.trim();

      logger.info({
        message: "JD analysis started",
        domain,
      });

      const result = await this.llm.analyzeJD(`
STRICT DOMAIN LOCK:
You are ONLY allowed to analyze this domain: ${domain}

RULES:
- Do NOT mix other domains
- Do NOT output generic skills
- Be highly specific to domain

JOB DESCRIPTION:
${cleanedJD}
`);

      const validated = this.validate(result);

      return {
        ...validated,
        detected_domain: domain,
      };
    } catch (err: any) {
      logger.error({
        message: "JDService failed",
        error: err?.message || err,
      });

      return this.fallback(domain);
    }
  }
}