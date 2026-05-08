import { useState } from "react";

import { analyzeCareer } from "./api";

import type {
  CareerAnalysisResponse,
} from "./types";

interface UseCareerReturn {
  analyze: (input: string) => Promise<void>;

  data: CareerAnalysisResponse | null;

  loading: boolean;

  error: string | null;

  clear: () => void;
}

/**
 * Career Intelligence Hook
 */
export const useCareer =
  (): UseCareerReturn => {
    const [data, setData] =
      useState<CareerAnalysisResponse | null>(
        null
      );

    const [loading, setLoading] =
      useState(false);

    const [error, setError] =
      useState<string | null>(null);

    /**
     * Analyze career goal / JD
     */
    const analyze = async (
      input: string
    ) => {
      try {
        setLoading(true);

        setError(null);

        const trimmed = input.trim();

        if (!trimmed) {
          throw new Error(
            "Please enter a career goal or job description"
          );
        }

        const result =
          await analyzeCareer({
            input: trimmed,
          });

        setData(result);
      } catch (err: any) {
        setError(
          err?.message ||
            "Career analysis failed"
        );

        setData(null);
      } finally {
        setLoading(false);
      }
    };

    /**
     * Reset state
     */
    const clear = () => {
      setData(null);

      setError(null);

      setLoading(false);
    };

    return {
      analyze,
      data,
      loading,
      error,
      clear,
    };
  };