import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-white" />
    </div>
  );
};