import { useState } from "react";
import { analyzeJD } from "./api";
import type { JDAnalysisResponse } from "./types";
import { useDebounce } from "../../hooks/useDebounce";

export const useJDAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JDAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const debouncedInput = useDebounce(input, 500);

  const analyze = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const data = await analyzeJD({
        job_description: input,
      });

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    input,
    setInput,
    debouncedInput,
    loading,
    result,
    error,
    analyze,
  };
};