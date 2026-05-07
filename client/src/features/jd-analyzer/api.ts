import { api } from "../../services/api";
import type {
  JDAnalysisRequest,
  JDAnalysisResponse,
  APIResponse,
} from "./types";

/**
 * JD Analyzer API layer
 * Keeps feature logic isolated from global API
 */
export const analyzeJD = async (
  payload: JDAnalysisRequest
): Promise<JDAnalysisResponse> => {
  const response = await api.post<APIResponse<JDAnalysisResponse>>(
    "/api/v1/jd/analyze",
    payload
  );

  return response.data.data;
};