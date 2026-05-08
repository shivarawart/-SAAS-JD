import { api } from "../../services/api";

import type {
  APIResponse,
  CareerAnalysisRequest,
  CareerAnalysisResponse,
} from "./types";

/**
 * Career Intelligence API
 */
export const analyzeCareer = async (
  payload: CareerAnalysisRequest
): Promise<CareerAnalysisResponse> => {
  try {
    const response =
      await api.post<
        APIResponse<CareerAnalysisResponse>
      >(
        "/api/v1/career/analyze",
        payload
      );

    if (!response.data.success) {
      throw new Error(
        response.data.error ||
          "Career analysis failed"
      );
    }

    return response.data.data;
  } catch (err: any) {
    console.error(
      "Career API Error:",
      err?.message || err
    );

    throw new Error(
      err?.response?.data?.error ||
        "Unable to analyze career path"
    );
  }
};