import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { JDInput } from "../features/jd-analyzer/components/JDInput";
import { JDResults } from "../features/jd-analyzer/components/JDResults";
import { useJDAnalyzer } from "../features/jd-analyzer/useJDAnalyzer";
import { Loader } from "../components/ui/Loader";

export const Home: React.FC = () => {
  const { input, setInput, analyze, loading, result, error } =
    useJDAnalyzer();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2">
        
        {/* LEFT PANEL */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">
            Recruiter Intent Decoder
          </h1>

          <p className="text-sm text-zinc-400">
            Paste a job description and uncover real hiring intent.
          </p>

          <JDInput
            value={input}
            onChange={setInput}
            onAnalyze={analyze}
            loading={loading}
          />

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-4">
          {loading && <Loader />}

          {!loading && result && (
            <JDResults data={result} />
          )}

          {!loading && !result && (
            <div className="rounded-xl border border-zinc-800 p-6 text-sm text-zinc-500">
              Your analysis will appear here
            </div>
          )}
        </div>
      </main>
    </div>
  );
};