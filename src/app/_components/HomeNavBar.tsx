"use client";

import { useState } from "react";
import Image from "next/image";
import HomeSearchBar from "./HomeSearchBar";

const HomeNavBar = () => {
  const [openSidebar, setOpenSidebar] = useState<Boolean>(true);

  return (
    <nav className="flex w-full items-center pl-1 pr-3">
      <div className="flex w-2/5 flex-auto items-center">
        <div
          tabIndex={0}
          role="button"
          className="pointer focus-visible flex rounded px-2"
          aria-label={openSidebar ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            className="quieter parent-hover-link-unquiet flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#List"
            ></use>
          </svg>
        </div>
        <a href="/" aria-label="Airtable home" className="mx-3">
          <Image
            src={"/airtable.svg"}
            alt={"image of the airtable logo"}
            width={102}
            height={22.2}
          />
        </a>
      </div>
      <div className="flex w-[354px] justify-center">
        <HomeSearchBar />
      </div>
      <div className="flex w-2/5 items-center justify-end gap-6">
        <div className="help-menu flex justify-center items-center text-sm gap-1 font-light" role="button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="icon flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Question"
            ></use>
          </svg> Help
        </div>
        <div className="notification-menu flex justify-center items-center w-[26px] h-[26px] border-[1px] rounded-full hover:bg-gray-200" role="button">
          <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none">
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Bell"
            ></use>
          </svg>
        </div>
        <div
          className="profile-icon flex h-[26px] w-[26px] items-center justify-center rounded-full bg-purple-700 text-center text-sm text-white"
          role="button"
        >
          M
        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
