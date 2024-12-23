
const BaseToolBar = () => {

  return <div className="w-full h-9 bg-red-dusty flex items-end gap-2 justify-between">
    <div className="left bg-red-dusty-dark h-8 w-full rounded-tr-lg"></div>
    <div className="right bg-red-dusty-dark h-8 rounded-tl-lg text-white flex px-2 gap-5">
      <button className="flex items-center text-sm font-light px-1 opacity-80 hover:opacity-100">
        Extensions
      </button>
      <button className="flex items-center text-sm font-light px-1 opacity-80 gap-1 hover:opacity-100">
        Tools
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
      </button>
    </div>
  </div>
}

export default BaseToolBar;