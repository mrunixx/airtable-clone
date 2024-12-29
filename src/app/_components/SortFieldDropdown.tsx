import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Table } from "@tanstack/react-table";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { api } from "~/trpc/react";

type Props = {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>
  tableId: string;
};

const SortFieldDropdown = ({ selected, setSelected, tableId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (change: boolean) => {
    setIsOpen(change);
  };

  const { data: fields, isLoading: isBaseLoading } =
    api.table.getTableHeaders.useQuery(
      { tableId: tableId },
      { refetchOnWindowFocus: true},
    );

  const handleClick = (index: number) => {
    setSelected(index);
    setIsOpen(false);
  }

  return (
    <div>
      <Popover placement="bottom-start" showArrow={false} isOpen={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <div className="mx-2 flex items-center gap-3">
            <div className="flex h-7 w-[240px] cursor-pointer items-center rounded-sm border px-2 text-[13px] outline-none">
              <p>{fields?.[selected]?.name}</p>
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
        <PopoverContent className="flex w-[240px] flex-col rounded-md p-0 shadow-elevation-high py-2">
          {fields?.map((field, index) => {
            return (
              <div
                key={index}
                className="flex h-8 w-full items-center px-3 hover:bg-gray-200 gap-1 font-light text-[13px]"
                onClick={() => handleClick(index)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="primaryDisplayTypeIcon flex-none"
                >
                  <use
                    fill="var(--palette-neutral-quiet)"
                    href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Paragraph"
                  ></use>
                </svg>
                <p>{field.name}</p>
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SortFieldDropdown;
