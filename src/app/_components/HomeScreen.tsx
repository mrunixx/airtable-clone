"use client"

import HomeNavBar from "./HomeNavBar";
import HomeSideBar from "./HomeSideBar";
import HomeDashboard from "./HomeDashboard";
import { useState } from "react";

const HomeScreen = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-[55px] w-full justify-center border-[1px]">
        <HomeNavBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      </header>
      <div className="main flex flex-grow">
        <HomeSideBar openSidebar={openSidebar} />
        <HomeDashboard />
      </div>
    </div>
  );
};

export default HomeScreen;
