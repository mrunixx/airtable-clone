type Props = {
  children: React.ReactNode;
  heading: string;
  addFunctionality: boolean;
};

const SideBarDropdown = ({ children, heading, addFunctionality }: Props) => {
  return (
    <div
      role="button"
      className="mb-1 flex h-[40px] w-full items-center justify-between text-base hover:bg-gray-100 px-2 py-3 rounded-sm"
    >
      <p>{heading}</p>
      <div className="actions flex items-center justify-center gap-2">
        {addFunctionality && (
          <div className="h-[24px] w-[24px] rounded-md hover:bg-gray-200 flex justify-center items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="text-color-default flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
              ></use>
            </svg>
          </div>
        )}
        <div className="h-[24px] w-[24px] rounded-md hover:bg-gray-200 flex justify-center items-center transform -rotate-90">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="animate text-color-default css-4dsd3s flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
            ></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SideBarDropdown;
