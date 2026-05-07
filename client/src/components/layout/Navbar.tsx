import React from "react";

export const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="text-lg font-semibold tracking-tight text-white">
          JD Intelligence
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <a href="#" className="hover:text-white transition">
            Docs
          </a>
          <a href="#" className="hover:text-white transition">
            GitHub
          </a>
          <button className="rounded-md bg-white px-3 py-1 text-black text-sm font-medium hover:bg-zinc-200 transition">
            Try Now
          </button>
        </div>
      </div>
    </header>
  );
};