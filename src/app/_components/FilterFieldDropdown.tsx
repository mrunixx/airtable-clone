import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@nextui-org/react";
import { Field } from "@prisma/client";
  import { Dispatch, SetStateAction, useEffect, useState } from "react";
  import { api } from "~/trpc/react";
  
  type Props = {
    selected: Field | undefined;
    setSelected: Dispatch<SetStateAction<Field | undefined>>
    tableId: string;
  };
  
  const FilterFieldDropdown = ({ selected, setSelected, tableId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleOpenChange = (change: boolean) => {
      setIsOpen(change);
    };
  
    const { data: fields } =
      api.table.getTableHeaders.useQuery(
        { tableId: tableId },
        { refetchOnWindowFocus: true},
      );
  
    const handleClick = (field: Field) => {
      setSelected(field);
      setIsOpen(false);
    }

    useEffect(() => {
      console.log(selected)
    }, [selected])
  
    return (
      <div>
        <Popover placement="bottom-start" showArrow={false} isOpen={isOpen} onOpenChange={handleOpenChange}>
          <PopoverTrigger>
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-[124px] cursor-pointer items-center rounded-sm border px-3 text-[13px] outline-none">
                <p>{selected?.name ?? "Name"}</p>
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
          <PopoverContent className="flex w-[124px] flex-col rounded-md shadow-elevation-high py-2">
            {fields?.map((field, index) => {
              return (
                <div
                  key={index}
                  className="flex h-8 w-full items-center px-3 hover:bg-gray-200 gap-1 font-light text-[13px]"
                  onClick={() => handleClick(field)}
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
  
  export default FilterFieldDropdown;
  