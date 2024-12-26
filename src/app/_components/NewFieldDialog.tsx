import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useState } from "react";

type Props = {
  handleClick: (input: string) => void;
}

export default function NewFieldDialog({ handleClick }: Props) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    handleClick(input);
    setInput("");
    setIsOpen(false);
  }

  const handleOpenChange = (change: boolean) => {
    setIsOpen(change)
  }

  return (
    <Popover placement="bottom" showArrow={false} isOpen={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <div className="add-col flex h-8 w-[94px] cursor-pointer items-center justify-center border-r border-b border-gray-300 bg-[#f4f4f4]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
            ></use>
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex h-[202px] w-[400px] flex-col rounded-md px-4 py-2">
        <input
          type="text"
          className="mb-auto mt-2 h-8 w-[368px] rounded-md p-2 text-[13px] shadow-elevation-low placeholder:text-gray-500"
          placeholder="Field name (optional)"
          value={input}
          onChange={(e) => {setInput(e.target.value)}}
        />
        <div className="mt-auto flex w-full items-center pb-4 pt-2">
          <button className="add-desc flex h-8 items-center rounded-md px-3 hover:bg-[#f2f2f2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="mr-2"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
              ></use>
            </svg>
            <p className="text-[13px]">Add description</p>
          </button>
          <button
            className="ml-auto shadow-elevation-low px-3 bg-[#0d70df] text-white text-[13px] h-8 rounded-md"
            type="button"
            onClick={handleOnClick}
          >
              Create field
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
