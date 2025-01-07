import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

const SearchPopup = ({ value, setValue } : Props) => {
  const [input, setInput] = useState("") 
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (change: boolean) => {
    setIsOpen(change);
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setValue(input); 
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [input, setValue]);

  return (
    <Popover
      placement="bottom-start"
      showArrow={false}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <PopoverTrigger>
        <div className="ml-auto flex items-center justify-center" role="button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="noevents hover:font-strong flex-none font-light"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#MagnifyingGlass"
            ></use>
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className="mt-1.5 flex h-[92px] w-[300px] flex-col items-start justify-start rounded-none border-x border-b p-0 text-sm shadow-elevation-high">
        <div className="flex h-[38px] w-[296px] items-center p-2">
          <input
            type="text"
            placeholder="Find in view"
            className="text-13 outline-none placeholder:text-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="ml-auto flex items-center justify-center" onClick={() => setInput("")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none cursor-pointer"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#X"
              ></use>
            </svg>
          </div>
        </div>
        <div className="h-[54px] w-full bg-[#f2f2f2] p-2 font-light flex flex-col gap-1">
          <p className="text-xs">Use advanced search options in the</p>
          <div className="flex items-center gap-1 cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="mr-half flex-none items-center text-blue-600"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ExtensionsFeature"
              ></use>
            </svg>
            <p className="text-xs text-blue-600">search extension</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchPopup;
