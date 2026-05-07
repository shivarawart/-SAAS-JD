import React from "react";
import { Home } from "./pages/Home";

/**
 * App Shell
 * - Central layout container
 * - Ready for routing (React Router later)
 * - Future scalable SaaS structure
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      
      {/* Main Application Area */}
      <main className="flex-1">
        <Home />
      </main>

      {/* Optional Footer (SaaS feel) */}
      <footer className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
        Built with React + Bun + Hono • JD Intelligence System
      </footer>
    </div>
  );
};

export default App;