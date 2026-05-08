interface Props {
  roadmap: string[];

  timeline: string;
}

const RoadmapCard = ({
  roadmap,
  timeline,
}: Props) => {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Learning Roadmap
        </h3>

        <div className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
          {timeline}
        </div>
      </div>

      <div className="space-y-4">
        {roadmap.map((step, index) => (
          <div
            key={step}
            className="flex gap-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
              {index + 1}
            </div>

            <div className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;