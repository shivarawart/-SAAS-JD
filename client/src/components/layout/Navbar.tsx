import React from "react";

import { Link, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        
        {/* LEFT */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-lg shadow-lg">
            🚀
          </div>

                  <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold tracking-tight text-white">
            JD Intelligence
          </h1>

          {/* BETA BADGE */}
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 text-[10px] font-medium text-yellow-400">
            BETA
          </span>
        </div>
        </Link>

        {/* CENTER NAV */}
        <nav className="hidden items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-1 md:flex">
          
          <Link
            to="/"
            className={`rounded-xl px-4 py-2 text-sm transition ${
              location.pathname === "/"
                ? "bg-white text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            JD Analyzer
          </Link>

          <Link
            to="/career"
            className={`rounded-xl px-4 py-2 text-sm transition ${
              location.pathname === "/career"
                ? "bg-white text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Career AI
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          
          <a
            href="https://github.com/shivarawart/-SAAS-JD.git"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 md:inline-flex"
          >
            GitHub
          </a>

          <Link
            to={
              location.pathname === "/"
                ? "/career"
                : "/"
            }
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            {location.pathname === "/"
              ? "Career AI"
              : "JD Analyzer"}
          </Link>
        </div>
      </div>
    </header>
  );
};