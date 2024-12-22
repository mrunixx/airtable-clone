import { useState } from "react";
import SideBarDropdown from "./SideBarDropdown";

type Props = {
  openSidebar: boolean;
};

const HomeSideBar = ({ openSidebar }: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const handleCreateBaseScratch = () => {
    
  }

  return (
    <div onMouseLeave={handleMouseLeave} onMouseOver={handleMouseEnter} className="flex">
      {openSidebar || isHover ? (
        <div className="sidebar flex w-[300px] min-w-[300px] flex-col border-r-[1px] p-3">
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
            <div className="flex flex-col text-sm font-light">
              <div className="flex items-center gap-1 hover:bg-gray-100 p-2" role="button">
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
              <div className="flex items-center gap-1 hover:bg-gray-100 p-2" role="button">
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
              <div className="flex items-center gap-1 hover:bg-gray-100 p-2" role="button">
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
            <button className="mb-2 mt-auto flex h-[32px] w-full items-center justify-center gap-2 rounded-md bg-[#1f70dc] text-sm text-white"
              onClick={handleCreateBaseScratch}
            >
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
      ) : (
        <div className="flex w-14 flex-col items-center border-r-[1px] py-4">
          <div className="mb-auto flex flex-col gap-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#House"
              ></use>
            </svg>
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#UsersThree"
              ></use>
            </svg>
            <hr />
          </div>
          <div className="mt-auto flex flex-col gap-5">
            <hr />
            <div className="flex flex-col items-center justify-center gap-5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="icon flex-none opacity-50"
              >
                <use
                  fill="currentColor"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#BookOpen"
                ></use>
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="icon flex-none opacity-50"
              >
                <use
                  fill="currentColor"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ShoppingBagOpen"
                ></use>
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="icon flex-none opacity-50"
              >
                <use
                  fill="currentColor"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#UploadSimple"
                ></use>
              </svg>
            </div>

            <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md border-[1px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="quieter flex-none opacity-50"
              >
                <use
                  fill="currentColor"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
                ></use>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSideBar;
