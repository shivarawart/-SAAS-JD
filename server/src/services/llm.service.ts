import OpenAI from "openai";

import { env } from "../config/env";
import { logger } from "../config/logger";

import { JD_ANALYSIS_PROMPT } from "../prompts/jd.prompt";

export class LLMService {
  private client: OpenAI;

  constructor() {
    if (!env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY is missing"
      );
    }

    this.client = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  /**
   * CLEAN MODEL RESPONSE
   */
  private cleanContent(content: string) {
    return content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  }

  /**
   * SAFE JSON PARSER
   */
  private safeParse(content: string) {
    try {
      return JSON.parse(content);
    } catch (error) {
      logger.error({
        message: "Failed to parse AI JSON",
        raw: content,
      });

      throw new Error(
        "Invalid JSON returned by AI"
      );
    }
  }

  /**
   * DETECT DOMAIN
   * Makes AI responses specialized
   */
  private detectDomain(input: string) {
    const text = input.toLowerCase();

    // AI / ML
    if (
      text.includes("ai") ||
      text.includes("machine learning") ||
      text.includes("deep learning") ||
      text.includes("llm") ||
      text.includes("hugging face") ||
      text.includes("nlp")
    ) {
      return "AI Engineering";
    }

    // Data Science
    if (
      text.includes("data science") ||
      text.includes("data scientist")
    ) {
      return "Data Science";
    }

    // Data Analytics
    if (
      text.includes("data analyst") ||
      text.includes("analytics")
    ) {
      return "Data Analytics";
    }

    // Frontend
    if (
      text.includes("frontend") ||
      text.includes("react") ||
      text.includes("next.js")
    ) {
      return "Frontend Engineering";
    }

    // Backend
    if (
      text.includes("backend") ||
      text.includes("node") ||
      text.includes("bun") ||
      text.includes("api")
    ) {
      return "Backend Engineering";
    }

    // DevOps
    if (
      text.includes("devops") ||
      text.includes("docker") ||
      text.includes("kubernetes")
    ) {
      return "DevOps";
    }

    return "Software Engineering";
  }

  /**
   * SMART FALLBACKS
   */
  private fallback(domain: string) {
    switch (domain) {
      case "AI Engineering":
        return {
          must_have_skills: [
            "Python",
            "PyTorch",
            "Transformers",
            "Machine Learning",
            "Deep Learning",
          ],

          nice_to_have_skills: [
            "RAG",
            "Vector Databases",
            "MLOps",
          ],

          hidden_expectations: [
            "Strong experimentation mindset",
            "Ability to evaluate AI models",
          ],

          likely_interview_questions: [
            "Explain transformers",
            "What is RAG?",
            "Difference between CNN and RNN",
          ],

          red_flags: [
            "Only AI wrapper experience",
          ],
        };

      case "Data Science":
        return {
          must_have_skills: [
            "Python",
            "SQL",
            "Statistics",
            "Pandas",
            "NumPy",
          ],

          nice_to_have_skills: [
            "Machine Learning",
            "Data Visualization",
          ],

          hidden_expectations: [
            "Strong business understanding",
          ],

          likely_interview_questions: [
            "Explain overfitting",
            "Difference between supervised and unsupervised learning",
          ],

          red_flags: [
            "Weak statistical fundamentals",
          ],
        };

      case "Frontend Engineering":
        return {
          must_have_skills: [
            "React",
            "TypeScript",
            "JavaScript",
          ],

          nice_to_have_skills: [
            "Next.js",
            "Testing",
            "Performance Optimization",
          ],

          hidden_expectations: [
            "Strong debugging skills",
          ],

          likely_interview_questions: [
            "Explain React hooks",
            "How reconciliation works",
          ],

          red_flags: [
            "Only tutorial projects",
          ],
        };

      default:
        return {
          must_have_skills: [
            "Problem Solving",
            "Communication",
          ],

          nice_to_have_skills: [
            "System Design",
          ],

          hidden_expectations: [
            "Fast learning mindset",
          ],

          likely_interview_questions: [
            "Tell me about your projects",
          ],

          red_flags: [
            "Lack of practical experience",
          ],
        };
    }
  }

  /**
   * MAIN AI ANALYSIS FUNCTION
   */
  async analyzeJD(jobDescription: string) {
    const domain =
      this.detectDomain(jobDescription);

    try {
      if (
        !jobDescription ||
        typeof jobDescription !==
          "string"
      ) {
        throw new Error(
          "Job description is required"
        );
      }

      logger.info({
        message:
          "OpenAI analysis started",

        domain,
      });

      const response =
        await this.client.chat.completions.create({
          model: "gpt-4o-mini",

          temperature: 0.1,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",

              content:
                JD_ANALYSIS_PROMPT,
            },

            {
              role: "user",

              content: `
Detected Domain:
${domain}

Job Description:
${jobDescription}
              `,
            },
          ],
        });

      const rawContent =
        response.choices?.[0]?.message
          ?.content;

      if (!rawContent) {
        throw new Error(
          "Empty AI response"
        );
      }

      const cleaned =
        this.cleanContent(rawContent);

      const parsed =
        this.safeParse(cleaned);

      logger.info({
        message:
          "AI analysis completed",

        domain,
      });

      return parsed;
    } catch (err: any) {
      logger.error({
        message:
          "LLM analysis failed",

        domain,

        error:
          err?.message || err,
      });

      /**
       * SMART FALLBACK
       */
      return this.fallback(domain);
    }
  }
}