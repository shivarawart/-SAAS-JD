import type { CareerAnalysisResponse } from "../../features/career/types";

import SkillCard from "./SkillCard";
import RoadmapCard from "./RoadmapCard";
import ResourceCard from "./ResourceCard";

interface Props {
  data: CareerAnalysisResponse;
}

const CareerResults = ({
  data,
}: Props) => {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-8">
        <p className="mb-2 text-sm text-zinc-500">
          Career Target
        </p>

        <h2 className="text-3xl font-bold text-white">
          {data.career_target}
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SkillCard
          title="Required Skills"
          items={data.required_skills}
        />

        <SkillCard
          title="Advanced Skills"
          items={data.advanced_skills}
        />
      </div>

      <RoadmapCard
        roadmap={data.learning_roadmap}
        timeline={
          data.estimated_learning_timeline
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ResourceCard
          title="Best Free Resources"
          resources={data.best_free_resources}
        />

        <ResourceCard
          title="Best Paid Resources"
          resources={data.best_paid_resources}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResourceCard
          title="Recommended Projects"
          resources={
            data.recommended_projects
          }
        />

        <ResourceCard
          title="Resume Improvements"
          resources={
            data.resume_improvements
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResourceCard
          title="Certifications"
          resources={
            data.recommended_certifications
          }
        />

        <ResourceCard
          title="Hidden Industry Expectations"
          resources={
            data.hidden_industry_expectations
          }
        />
      </div>

      <ResourceCard
        title="Common Mistakes"
        resources={data.common_mistakes}
      />
    </div>
  );
};

export default CareerResults;