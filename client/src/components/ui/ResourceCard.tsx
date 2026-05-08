interface Props {
  title: string;

  resources: string[];
}

const ResourceCard = ({
  title,
  resources,
}: Props) => {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="mb-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300"
          >
            {resource}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceCard;