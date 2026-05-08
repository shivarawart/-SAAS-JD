import React from "react";

import { Navbar } from "../components/layout/Navbar";

import CareerHeader from "../components/ui/CareerHeader";
import CareerInput from "../components/ui/CareerInput";
import CareerResults from "../components/ui/CareerResults";

import { useCareer } from "../features/career/useCareer";

const Career: React.FC = () => {
  const {
    analyze,
    data,
    loading,
    error,
    clear,
  } = useCareer();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-zinc-800/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-zinc-900/30 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
        
        {/* HERO */}
        <section className="space-y-6">
          <CareerHeader />

          {/* Mini Features */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "AI Career Roadmaps",
              "Interview Guidance",
              "Resume Intelligence",
              "Skill Analysis",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-[11px] text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* INPUT CARD */}
        <section>
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xl md:p-6">
            
            <div className="mb-5">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Analyze Your Career Path
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Paste a job description or describe your target role.
                The AI will generate required skills, learning roadmap,
                projects, certifications, and recruiter expectations.
              </p>
            </div>

            <CareerInput
              loading={loading}
              onAnalyze={analyze}
            />
          </div>
        </section>

        {/* QUICK INFO */}
        {!loading && !data && (
          <section className="grid gap-4 md:grid-cols-3">
            
            {[
              {
                icon: "🧠",
                title: "Skill Detection",
              },

              {
                icon: "🚀",
                title: "Learning Paths",
              },

              {
                icon: "🎯",
                title: "Interview Prep",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-black text-lg">
                  {item.icon}
                </div>

                <h3 className="text-sm font-medium text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </section>
        )}

        {/* ERROR */}
        {error && (
          <section>
            <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-4">
              
              <div className="flex items-start justify-between gap-4">
                
                <div>
                  <h3 className="text-sm font-medium text-red-400">
                    Analysis Failed
                  </h3>

                  <p className="mt-1 text-sm text-red-300">
                    {error}
                  </p>
                </div>

                <button
                  onClick={clear}
                  className="rounded-lg border border-red-800 px-3 py-1 text-xs text-red-300 hover:bg-red-900/30"
                >
                  Clear
                </button>
              </div>
            </div>
          </section>
        )}

        {/* LOADING */}
        {loading && (
          <section className="grid gap-4 md:grid-cols-2">
            
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"
                >
                  <div className="mb-4 h-4 w-32 animate-pulse rounded bg-zinc-800" />

                  <div className="space-y-2">
                    <div className="h-3 animate-pulse rounded bg-zinc-800" />

                    <div className="h-3 w-5/6 animate-pulse rounded bg-zinc-800" />
                  </div>
                </div>
              )
            )}
          </section>
        )}

        {/* RESULTS */}
        {!loading && data && (
          <section>
            <CareerResults data={data} />
          </section>
        )}

        {/* EMPTY */}
        {!loading && !data && !error && (
          <section>
            <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/20 px-6 py-12 text-center">
              
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-black text-2xl">
                🚀
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Build Smarter Career Paths
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">
                AI-powered career intelligence for developers,
                engineers, designers, AI specialists, and modern
                tech professionals.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                {[
                  "Frontend",
                  "Backend",
                  "AI/ML",
                  "DevOps",
                  "Data Science",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-[11px] text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="mt-2 border-t border-zinc-900 pt-6">
          
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            
            <div>
              <h3 className="text-sm font-medium text-white">
                AI Career Intelligence
              </h3>

              <p className="mt-1 text-xs leading-6 text-zinc-500">
                Production-grade AI guidance for modern developers.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-zinc-500">
              
              <a
                href="https://github.com/shivarawart/-SAAS-JD.git"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                GitHub
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                LinkedIn
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Career;