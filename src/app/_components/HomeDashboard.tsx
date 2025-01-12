import DashboardCard from "./DashboardCard";
import DisplayBaseCards from "./DisplayBaseCards";

const HomeDashboard = () => {
  return (
    <div className="flex flex-auto flex-col gap-6 bg-[#f8fafc] px-12 py-8">
      <p className="text-[1.75rem] font-semibold">Home</p>
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
      <div className="sorting flex items-center justify-between">
        <div className="left flex items-center gap-2">
          <div className="dropdown flex items-center gap-1">
            <p className="text-sm opacity-70">Opened by you</p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none opacity-70"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
              ></use>
            </svg>
          </div>
          <div className="dropdown flex items-center gap-1">
            <p className="text-sm opacity-70">Show all types</p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none opacity-70"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
              ></use>
            </svg>
          </div>
        </div>
        <div className="right flex items-center" role="radiogroup">
          <div role="radio" className="cursor-pointer p-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#List"
              ></use>
            </svg>
          </div>
          <div role="radio" className="cursor-pointer p-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#GridFour"
              ></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="opacity-70 text-sm">Today</p>
        <div className="flex flex-wrap gap-4">
          <DisplayBaseCards />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
