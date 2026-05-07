import React from "react";

type Props = {
  title: string;
  items: string[];
};

export const ResultCard: React.FC<Props> = ({ title, items }) => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-zinc-200">
        {title}
      </h3>

      <ul className="space-y-2 text-sm text-zinc-400">
        {items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
};