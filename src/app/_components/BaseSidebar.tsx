import SidebarCreate from "./SidebarCreate";
import SideViewSearch from "./SideViewSearch";

const BaseSidebar = () => {
  return (
    <div className="flex w-[260px] min-w-[260px] flex-col bg-white border-t">
      <SideViewSearch />
      <div className="curr-view mx-4 mt-2 bg-[#d5f1ff] rounded-sm flex">
        <div
          tabIndex={0}
          role="button"
          className="flex h-8 w-full items-center p-2"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-darken4 flex-none"
          >
            <use
              fill="rgb(22, 110, 225)"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#GridFeature"
            ></use>
          </svg>
          <div className={`mx-2 text-sm`}>Grid View</div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            className="icon ml-auto flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Check"
            ></use>
          </svg>
        </div>
      </div>
      <SidebarCreate />
    </div>
  );
};

export default BaseSidebar;
