import HomeNavBar from "./HomeNavBar";
import HomeSideBar from "./HomeSideBar";
import HomeDashboard from "./HomeDashboard";

const HomeScreen = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-[55px] w-full justify-center border-[1px]">
        <HomeNavBar />
      </header>
      <div className="main flex flex-grow">
        <HomeSideBar />
        <HomeDashboard />
      </div>
    </div>
  );
};

export default HomeScreen;
