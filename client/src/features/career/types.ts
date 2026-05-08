export interface CareerAnalysisRequest {
  input: string;
}

export interface CareerAnalysisResponse {
  career_target: string;

  required_skills: string[];

  advanced_skills: string[];

  learning_roadmap: string[];

  recommended_projects: string[];

  best_free_resources: string[];

  best_paid_resources: string[];

  recommended_certifications: string[];

  resume_improvements: string[];

  hidden_industry_expectations: string[];

  common_mistakes: string[];

  estimated_learning_timeline: string;
}

/**
 * Standard API wrapper
 */
export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}