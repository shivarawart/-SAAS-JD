import { useState } from "react";

import { Button} from "../ui/Button";

interface Props {
  loading: boolean;

  onAnalyze: (input: string) => void;
}

const CareerInput = ({
  loading,
  onAnalyze,
}: Props) => {
  const [input, setInput] = useState("");

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur">
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Example: I want to become AI Engineer or paste a frontend developer job description..."
          className="min-h-[220px] w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-sm text-white outline-none transition focus:border-zinc-600"
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Better input gives better AI career
            guidance.
          </p>

          <Button
            disabled={loading}
            onClick={() => onAnalyze(input)}
          >
            {loading
              ? "Analyzing..."
              : "Analyze Career"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerInput;