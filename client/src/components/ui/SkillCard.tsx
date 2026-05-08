interface Props {
  title: string;

  items: string[];
}

const SkillCard = ({
  title,
  items,
}: Props) => {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="mb-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;