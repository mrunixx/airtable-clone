const HomeSearchBar = () => {
  return (
    <div
      tabIndex={0}
      role="button"
      className="flex w-full items-center justify-between rounded-3xl border-[1px] px-4 py-1"
    >
      <div className="flex items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="icon flex-none"
        >
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#MagnifyingGlass"
          ></use>
        </svg>
        <p className="px-2 py-1 text-xs text-gray-400">Search...</p>
      </div>
        <p className="px-2 py-1 text-xs text-gray-400">⌘ K</p>
    </div>
  );
};

export default HomeSearchBar;
