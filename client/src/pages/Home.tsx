import React from "react";

import { Navbar } from "../components/layout/Navbar";

import { JDInput } from "../features/jd-analyzer/components/JDInput";
import { JDResults } from "../features/jd-analyzer/components/JDResults";

import { useJDAnalyzer } from "../features/jd-analyzer/useJDAnalyzer";

import { Loader } from "../components/ui/Loader";

export const Home: React.FC = () => {
  const {
    input,
    setInput,
    analyze,
    loading,
    result,
    error,
  } = useJDAnalyzer();

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white">
      
      {/* NAVBAR */}
      <Navbar />

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        
        {/* TOP GLOW */}
        <div className="absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-zinc-800/20 blur-3xl" />

        {/* RIGHT GLOW */}
        <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-zinc-900/30 blur-3xl" />
      </div>

      {/* MAIN */}
      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2 md:px-6 md:py-14">
        
        {/* LEFT SIDE */}
        <section className="flex flex-col justify-center">
          
          {/* BADGE */}
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-[11px] font-medium text-zinc-300 backdrop-blur">
            
            <span className="h-2 w-2 rounded-full bg-green-400" />

            AI Powered Recruiter Intelligence
          </div>

          {/* HERO */}
          <div className="space-y-5">
            
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              Decode
              <span className="text-zinc-500">
                {" "}
                Real Hiring Intent
              </span>
            </h1>

            <p className="max-w-lg text-sm leading-7 text-zinc-400 md:text-base">
              Analyze job descriptions with AI to uncover
              required skills, recruiter expectations,
              interview signals, and career growth insights.
            </p>
          </div>

          {/* FEATURE GRID */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            
            {[
              {
                title: "Skill Intelligence",
                desc: "Detect real hiring requirements.",
              },

              {
                title: "Hidden Signals",
                desc: "Find recruiter expectations.",
              },

              {
                title: "Interview Prep",
                desc: "Predict interview topics.",
              },

              {
                title: "Career Guidance",
                desc: "Generate learning roadmaps.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-3.5 backdrop-blur-xl"
              >
                <h3 className="mb-1 text-sm font-medium text-white">
                  {item.title}
                </h3>

                <p className="text-xs leading-5 text-zinc-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="mt-8">
            
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-xl">
              
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white">
                  Analyze Job Description
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Paste a JD and get recruiter-level insights instantly.
                </p>
              </div>

              <JDInput
                value={input}
                onChange={setInput}
                onAnalyze={analyze}
                loading={loading}
              />

              {error && (
                <div className="mt-4 rounded-2xl border border-red-900/40 bg-red-950/20 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* TRUST */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
            
            <span>⚡ GPT-4o Powered</span>

            <span>🚀 Production Grade</span>

            <span>🧠 Recruiter Intelligence</span>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex justify-center">
          
          {loading && <Loader />}

          {!loading && result && (
            <div className="w-full">
              <JDResults data={result} />
            </div>
          )}

          {!loading && !result && (
            <div className="w-full overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-900/40 p-5 shadow-2xl backdrop-blur-xl">
              
              {/* HEADER */}
              <div className="mb-6 flex items-center justify-between">
                
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    AI Analysis Preview
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Recruiter intelligence results appear here.
                  </p>
                </div>

                <div className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-[11px] text-zinc-400">
                  Live AI
                </div>
              </div>

              {/* PREVIEW CARDS */}
              <div className="space-y-4">
                
                {[
                  {
                    title: "Must-Have Skills",
                    items: [
                      "React",
                      "TypeScript",
                      "System Design",
                    ],
                  },

                  {
                    title: "Hidden Expectations",
                    items: [
                      "Ownership",
                      "Fast Execution",
                    ],
                  },

                  {
                    title: "Interview Signals",
                    items: [
                      "React Internals",
                      "Performance",
                    ],
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-zinc-800 bg-black/30 p-4"
                  >
                    <h3 className="mb-3 text-sm font-medium text-white">
                      {card.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {card.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] text-zinc-300"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM */}
              <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/20 p-4">
                
                <p className="text-sm leading-7 text-zinc-400">
                  Built for developers and engineers who want
                  deeper recruiter insights, stronger interview
                  preparation, and modern AI-powered career guidance.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 mt-8 border-t border-zinc-900">
        
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-8 md:flex-row md:items-center md:px-6">
          
          {/* LEFT */}
          <div>
            <h2 className="text-sm font-medium text-white">
              JD Intelligence
            </h2>

            <p className="mt-2 max-w-md text-xs leading-6 text-zinc-500">
              AI-powered recruiter intelligence platform for
              developers, engineers, and modern tech careers.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5 text-sm text-zinc-500">
            
            <a
              href="https://github.com/shivarawart/-SAAS-JD.git"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Portfolio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};