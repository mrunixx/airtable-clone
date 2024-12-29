import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";

const sorts = ["A → Z", "Z → A"];

type Props = {
  sort: string
  setSort: Dispatch<SetStateAction<string>>
}

const SortTypeDropdown = ({ sort, setSort } : Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = (sort: string) => {
    setIsOpen(false);
    setSort(sort)
  };

  const handleOpenChange = (change: boolean) => {
    setIsOpen(change);
  };

  return (
    <Popover
      placement="bottom-start"
      showArrow={false}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <PopoverTrigger>
        <div className="flex h-7 w-[120px] cursor-pointer items-center rounded-sm border px-2 text-[13px] outline-none">
          <p className="w-full">{sort}</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="icon ml-auto flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
            ></use>
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col rounded-md p-0 w-[120px] text-[13px] text-gray-600 shadow-elevation-low">
        {sorts.map((sort, index) => {
          return (
            <div
              key={index}
              className="flex h-8 w-full items-center gap-1 px-3 text-[13px] font-light hover:bg-gray-200"
              onClick={() => handleOnClick(sort)}
            >
              <p>{sort}</p>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default SortTypeDropdown;
