import SideBarDropdown from "./SideBarDropdown";

const HomeSideBar = () => {
  return (
    <div className="sidebar flex flex-col border-r-[1px] p-3 w-[300px] min-w-[300px]">
      <div className="dropdowns">
        <SideBarDropdown heading="Home" addFunctionality={false}>
          <p>Home</p>
        </SideBarDropdown>
        <SideBarDropdown heading="All Workspaces" addFunctionality={true}>
          <p>All workspaces</p>
        </SideBarDropdown>
      </div>
      <div className="mt-auto flex flex-col gap-3">
        <hr />
        <div className="p-2 flex flex-col gap-3 text-sm font-light">
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#BookOpen"
              ></use>
            </svg>
            <p>Template and apps</p>
          </div>
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ShoppingBagOpen"
              ></use>
            </svg>
            <p>Marketplace</p>
          </div>
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#UploadSimple"
              ></use>
            </svg>
            <p>Import</p>
          </div>
        </div>
        <button className="mt-auto flex h-[32px] w-full items-center justify-center gap-2 rounded-md bg-[#1f70dc] text-sm text-white mb-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            className="noevents mr1 flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
            ></use>
          </svg>
          Create
        </button>
      </div>
    </div>
  );
};

export default HomeSideBar;
