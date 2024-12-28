import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

const SortFieldDropdown = () => {
  const [field, setField] = useState("Name");
  const [sort, setSort] = useState("A -> Z");
  return (
    <div>
      <Popover placement="bottom-start" showArrow={false}>
        <PopoverTrigger>
          <div className="flex items-center gap-3 mx-2">
            <div className="flex h-7 w-[240px] items-center rounded-sm border px-2 text-[13px] outline-none cursor-pointer">
              <p>{field}</p>
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
            <div className="flex h-7 w-[120px] items-center rounded-sm border px-2 text-[13px] outline-none cursor-pointer">
              <p>{sort}</p>
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
            <div className="flex items-center justify-center h-7 w-7 cursorp-pointer hover:bg-gray-200 rounded-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="icon flex-none"
              >
                <use
                  fill="currentColor"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#X"
                ></use>
              </svg>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex w-[240px] flex-col rounded-md h-8 shadow-elevation-high p-2">
          meow    
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SortFieldDropdown;
