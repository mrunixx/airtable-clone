import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useState } from "react";
import SortFieldDropdown from "./SortFieldDropdown";

type Props = {
  handleClick: (input: string) => void;
};

export default function SortDialog({ handleClick }: Props) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    handleClick(input);
    setInput("");
    setIsOpen(false);
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
        <div
          className="grid-view-options mr-2 flex h-[26px] items-center justify-center rounded-sm px-2 py-1 hover:bg-[#f1f1f2]"
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
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ArrowsDownUp"
            ></use>
          </svg>
          <p className="ml-1 p-0 text-[14px] font-light leading-[18px] text-[#212123]">
            Sort
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex min-h-[181px] w-[453px] min-w-[320px] flex-col rounded-md p-0 text-[13px] text-gray-600 shadow-elevation-high">
        <div className="w-full p-3">
          <div className="mx-2 flex items-center gap-1 text-[13px] text-gray-600">
            <p>Sort by</p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none text-gray-400"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Question"
              ></use>
            </svg>
          </div>
          <hr className="m-2" />
          <div className="mb-2 pt-2">
            <SortFieldDropdown />
          </div>
          <div className="flex">
            <div
              className="mx-2 flex h-8 cursor-pointer items-center"
              role="button"
              aria-expanded="false"
              tabIndex={0}
            >
              <div className="ml-1 flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="mr-3"
                >
                  <use
                    fill="currentColor"
                    href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
                  ></use>
                </svg>
                <p className="font-family-default text-size-default text-color-default line-height-4 font-weight-default">
                  Add another sort
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex h-11 w-full items-center bg-[#f6f8fc] px-1">
          <div className="ml-auto flex items-center">
            <div tabIndex={0} role="button" className="mr-1 p-1 hover:text-black">
              Cancel
            </div>
            <button
              className="m-2 ml-auto h-7 rounded-md bg-[#0d70df] px-2 text-[13px] text-white shadow-elevation-low"
              type="button"
            >
              Sort
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
