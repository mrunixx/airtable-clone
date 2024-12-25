const SideViewSearch = () => {

  return <div className="flex items-center mx-4 border-b focus-within:border-b-blue-500 text-[0.80rem] font-light">
    <label className="flex flex-auto">
      <div className="py-2 pl-2.5 pr-2 flex items-center justify-center">
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
      </div>
      <input
        className="flex items-center pr-2 w-[150px] outline-none"
        placeholder="Find a view"
        aria-autocomplete="list"
        name="viewListSearch"
      />
    </label>
    <button
      type="button"
      className="pointer mx-3"
      id="id_2136762f308c7200337392b1a62d45ed"
      aria-label="View list options"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="colors-foreground-subtle flex-none"
      >
        <use
          fill="currentColor"
          href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Cog"
        ></use>
      </svg>
    </button>
  </div>;
};

export default SideViewSearch;
