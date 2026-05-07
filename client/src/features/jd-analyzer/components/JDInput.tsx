import React from "react";
import { Button } from "../../../components/ui/Button";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onAnalyze: () => void;
  loading: boolean;
};

export const JDInput: React.FC<Props> = ({
  value,
  onChange,
  onAnalyze,
  loading,
}) => {
  return (
    <div className="space-y-3">
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste job description here..."
        className="h-64 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm outline-none focus:border-zinc-600"
      />

      <Button onClick={onAnalyze} loading={loading}>
        Analyze JD
      </Button>
    </div>
  );
};