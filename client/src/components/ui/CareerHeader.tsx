const CareerHeader = () => {
  return (
    <div className="space-y-4 text-center">
      <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-1 text-sm text-zinc-400 backdrop-blur">
        AI Career Intelligence
      </div>

      <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
        Decode Tech Careers With AI
      </h1>

      <p className="mx-auto max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
        Paste a job description or career goal and
        instantly get required skills, learning
        roadmap, projects, certifications, and
        industry expectations.
      </p>
    </div>
  );
};

export default CareerHeader;