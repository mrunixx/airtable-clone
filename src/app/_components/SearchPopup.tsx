import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { RecordValue } from "@prisma/client";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { api } from "~/trpc/react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  tableId: string;
  tableRecords: RecordValue[];
  setTableRecords: Dispatch<SetStateAction<RecordValue[]>>;
};

const SearchPopup = ({
  value,
  setValue,
  tableId,
  setTableRecords,
  tableRecords,
}: Props) => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: record,
    isFetching,
    isLoading,
  } = api.table.getSearchRecord.useQuery({ searchValue: value });
  const {
    data: searchRecords,
    isFetching: isRecordsFetching,
    isLoading: isRecordsLoading,
  } = api.table.getFilteredRecordValues.useQuery({
    tableId: tableId,
    offset: 0,
    limit: (record?.rowIndex ?? 0) + 40,
    filterOperator: "",
    filterFieldId: "",
    filterValue: "",
    sortOp: "",
    sortFieldId: "",
  });

  const handleOpenChange = (change: boolean) => {
    setIsOpen(change);
  };

  useEffect(() => {
    console.log(record);
    // get table records up to the row index of the record
    // scroll down to bottom
    // set offset to row index
  }, [record]);

  useEffect(() => {
    if (!isRecordsFetching && !isRecordsLoading && searchRecords) {
      // setTableRecords to searchRecords
      setTableRecords(searchRecords);
    }
  }, [isRecordsFetching, isRecordsLoading, searchRecords]);

  useEffect(() => {
    if (record) {
      const element = document.getElementById("table-ref");
      if (element) {
        element.scrollTo(0, (record?.rowIndex ?? 0) * 32);
      }
    }
  }, [tableRecords]);

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
          <div
            className="ml-auto flex items-center justify-center"
            onClick={() => setInput("")}
          >
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
        <div className="flex h-[54px] w-full flex-col gap-1 bg-[#f2f2f2] p-2 font-light">
          <p className="text-xs">Use advanced search options in the</p>
          <div className="flex cursor-pointer items-center gap-1">
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
