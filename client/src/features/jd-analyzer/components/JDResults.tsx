import React from "react";
import { ResultCard } from "./ResultCard";

type Props = {
  data: {
    must_have_skills: string[];
    nice_to_have_skills: string[];
    hidden_expectations: string[];
    likely_interview_questions: string[];
    red_flags: string[];
  };
};

export const JDResults: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4">
      
      <ResultCard
        title="Must Have Skills"
        items={data.must_have_skills}
      />

      <ResultCard
        title="Nice To Have Skills"
        items={data.nice_to_have_skills}
      />

      <ResultCard
        title="Hidden Expectations"
        items={data.hidden_expectations}
      />

      <ResultCard
        title="Likely Interview Questions"
        items={data.likely_interview_questions}
      />

      <ResultCard
        title="Red Flags"
        items={data.red_flags}
      />
    </div>
  );
};