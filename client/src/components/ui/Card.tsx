import React from "react";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm ${className}`}
    >
      {title && (
        <h3 className="mb-3 text-sm font-semibold text-zinc-200">
          {title}
        </h3>
      )}
      <div className="text-sm text-zinc-300">{children}</div>
    </div>
  );
};