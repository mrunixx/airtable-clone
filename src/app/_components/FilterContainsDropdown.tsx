import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { api } from "~/trpc/react";

type Props = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const items = [
  "contains",
  "does not contain",
  "is",
  "is not",
  "is empty",
  "is not empty",
  "greater than",
  "less than"
];

const FilterContainsDropdown = ({ selected, setSelected }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (change: boolean) => {

    setIsOpen(change);
  };

  const handleClick = (val: string) => {
    setSelected(val);
    setIsOpen(false);
  };

  return (
    <div>
      <Popover
        placement="bottom-start"
        showArrow={false}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
      >
        <PopoverTrigger>
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-[124px] cursor-pointer items-center rounded-sm border-r border-t border-b px-3 text-[13px] outline-none">
              {selected}
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
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col rounded-md py-2 shadow-elevation-high">
          {items.map((operator, index) => {
            return (
              <div
                key={index}
                className="flex h-8 w-full items-center gap-1 px-3 text-[13px] font-light hover:bg-gray-200"
                onClick={() => handleClick(operator)}
              >
                {operator}
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterContainsDropdown;
