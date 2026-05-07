export type JDAnalysisRequest = {
  job_description: string;
};

export type JDAnalysisResponse = {
  must_have_skills: string[];
  nice_to_have_skills: string[];
  hidden_expectations: string[];
  likely_interview_questions: string[];
  red_flags: string[];
};

export type APIResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};