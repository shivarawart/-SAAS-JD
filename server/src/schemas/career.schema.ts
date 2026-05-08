import { z } from "zod";

export const CareerAnalysisSchema = z.object({
  career_target: z.string(),

  required_skills: z.array(z.string()),

  advanced_skills: z.array(z.string()),

  learning_roadmap: z.array(z.string()),

  recommended_projects: z.array(z.string()),

  best_free_resources: z.array(z.string()),

  best_paid_resources: z.array(z.string()),

  recommended_certifications: z.array(z.string()),

  resume_improvements: z.array(z.string()),

  hidden_industry_expectations: z.array(z.string()),

  common_mistakes: z.array(z.string()),

  estimated_learning_timeline: z.string(),
});

export type CareerAnalysisResponse =
  z.infer<typeof CareerAnalysisSchema>;