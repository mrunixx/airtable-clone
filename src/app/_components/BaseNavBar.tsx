import BaseNavigationOptionButton from "./BaseNavigationOptionButton";

type Props = {
  baseName: string | undefined;
};

const BaseNavBar = ({ baseName }: Props) => {
  return (
    <nav className="bg-red-dusty flex h-[56px] w-full items-center pl-5 pr-4">
      <div className="left mr-auto flex items-center gap-3">
        <div className="" role="button">
          <svg
            width="24"
            height="20.4"
            viewBox="0 0 200 170"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                fill="hsla(0, 0%, 100%, 0.95)"
                d="M90.0389,12.3675 L24.0799,39.6605 C20.4119,41.1785 20.4499,46.3885 24.1409,47.8515 L90.3759,74.1175 C96.1959,76.4255 102.6769,76.4255 108.4959,74.1175 L174.7319,47.8515 C178.4219,46.3885 178.4609,41.1785 174.7919,39.6605 L108.8339,12.3675 C102.8159,9.8775 96.0559,9.8775 90.0389,12.3675"
              ></path>
              <path
                fill="hsla(0, 0%, 100%, 0.95)"
                d="M105.3122,88.4608 L105.3122,154.0768 C105.3122,157.1978 108.4592,159.3348 111.3602,158.1848 L185.1662,129.5368 C186.8512,128.8688 187.9562,127.2408 187.9562,125.4288 L187.9562,59.8128 C187.9562,56.6918 184.8092,54.5548 181.9082,55.7048 L108.1022,84.3528 C106.4182,85.0208 105.3122,86.6488 105.3122,88.4608"
              ></path>
              <path
                fill="hsla(0, 0%, 100%, 0.95)"
                d="M88.0781,91.8464 L66.1741,102.4224 L63.9501,103.4974 L17.7121,125.6524 C14.7811,127.0664 11.0401,124.9304 11.0401,121.6744 L11.0401,60.0884 C11.0401,58.9104 11.6441,57.8934 12.4541,57.1274 C12.7921,56.7884 13.1751,56.5094 13.5731,56.2884 C14.6781,55.6254 16.2541,55.4484 17.5941,55.9784 L87.7101,83.7594 C91.2741,85.1734 91.5541,90.1674 88.0781,91.8464"
              ></path>
            </g>
          </svg>
        </div>
        <div className="name flex items-center gap-1 text-white" role="button">
          <p className="text-lg font-medium">{baseName}</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="ml-half flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
            ></use>
          </svg>
        </div>
        <div className="nav-options flex items-center gap-3">
          <BaseNavigationOptionButton className="bg-red-dusty-dark shadow-inner">Data</BaseNavigationOptionButton>
          <BaseNavigationOptionButton className="">Automation</BaseNavigationOptionButton>
          <BaseNavigationOptionButton className="">Interfaces</BaseNavigationOptionButton>
          <div className="h-[20px] border-l opacity-20"></div>
          <BaseNavigationOptionButton className="">Forms</BaseNavigationOptionButton>
        </div>
      </div>
      <div className="right ml-auto flex items-center text-white">
        <div className="items-center px-3" role="button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="icon flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ClockCounterClockwise"
            ></use>
          </svg>
        </div>
        <div
          className="help-menu flex items-center justify-center gap-1 rounded-3xl px-3 py-1 text-sm font-light"
          role="button"
        >
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
          </svg>{" "}
          Help
        </div>
        <div
          className="share-btn mx-2 flex h-7 items-center justify-center gap-1 rounded-3xl bg-white px-3"
          role="button"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-red-dusty flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Users"
            ></use>
          </svg>
          <p className="text-red-dusty text-sm">Share</p>
        </div>
        <div
          className="notification-menu text-red-dusty flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white shadow-elevation-low hover:shadow-elevation-medium mx-2"
          role="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none">
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Bell"
            ></use>
          </svg>
        </div>
        <div
          className="profile-icon flex h-[28px] w-[28px] items-center justify-center rounded-full bg-purple-700 text-center text-sm text-white ml-2 border border-white"
          role="button"
        >
          M
        </div>
      </div>
    </nav>
  );
};

export default BaseNavBar;
