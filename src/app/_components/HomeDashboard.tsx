import DashboardCard from "./DashboardCard";

const HomeDashboard = () => {
  return (
    <div className="flex flex-auto flex-col bg-[#f8fafc] px-12 py-8">
      <p className="text-[1.75rem] font-semibold pb-6">Home</p>
      <div className="flex flex-wrap gap-4">
        <DashboardCard
          heading="Start with AI"
          info="Turn your process into an app with data and interfaces using AI."
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            className="icon flex-none"
          >
            <use
              fill="rgb(221, 4, 168)"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#AiFeature"
            ></use>
          </svg>
        </DashboardCard>
        <DashboardCard
          heading="Start with templates"
          info="Select a template to get started and customize as you go."
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            className="icon flex-none"
          >
            <use
              fill="rgb(99, 73, 141)"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#GridFour"
            ></use>
          </svg>
        </DashboardCard>
        <DashboardCard
          heading="Quickly upload"
          info="Easily migrate your existing projects in just a few minutes."
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            className="icon flex-none"
          >
            <use
              fill="rgb(13, 127, 120)"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ArrowUp"
            ></use>
          </svg>
        </DashboardCard>
        <DashboardCard
          heading="Start from scratch"
          info="Create a new blank base with custom tables, fields, and views."
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            className="icon flex-none"
          >
            <use
              fill="rgb(59, 102, 163)"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Table"
            ></use>
          </svg>
        </DashboardCard>
      </div>
    </div>
  );
};

export default HomeDashboard;
