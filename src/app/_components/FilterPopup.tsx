import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterFieldDropdown from "./FilterFieldDropdown";
import FilterContainsDropdown from "./FilterContainsDropdown";
import { api } from "~/trpc/react";
import { RecordValue } from "@prisma/client";

type Props = {
  tableId: string;
  setTableRecords: Dispatch<SetStateAction<RecordValue[]>>;
  filterOn: boolean;
  setFilterOn: Dispatch<SetStateAction<boolean>>;
};

export default function FilterPopup({
  tableId,
  setTableRecords,
  filterOn,
  setFilterOn,
}: Props) {
  const { data: fields } = api.table.getTableHeaders.useQuery(
    { tableId: tableId },
    { refetchOnWindowFocus: false },
  );
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [field, setField] = useState(fields?.[0]);
  const [operator, setOperator] = useState("contains");

  const [shouldFetch, setShouldFetch] = useState(false);
  const [offset, setOffset] = useState(0);

  const {
    data: records,
    isLoading,
    isFetching,
  } = api.table.getFilteredRecordValues.useQuery(
    {
      value: input,
      field: field?.id ?? "",
      operator: operator,
      tableId: tableId,
      offset: offset,
      limit: 400,
    },
    {
      enabled: shouldFetch && filterOn,
    },
  );

  const { data: originalRecords } = api.table.getTableRecordValues.useQuery({
    tableId: tableId,
    offset: 0,
    limit: 400,
  }, {
    refetchOnWindowFocus: false
  });

  const handleOnClick = () => {
    if (shouldFetch) {
      return;
    }
    setShouldFetch(true);
    setFilterOn(true);
    setTableRecords([]);
    setOffset(0);
  };

  useEffect(() => {
    if (!isLoading && !isFetching && records) {
      setTableRecords((prev) => [...prev, ...records]);
      if (records.length < 400) {
        setShouldFetch(false);
      }
    }
  }, [isLoading, isFetching, records]);

  const handleResetFilter = () => {
    setShouldFetch(false);
    setFilterOn(false);
    setTableRecords(originalRecords ?? []);
  };

  useEffect(() => {
    setField(fields?.[0]);
  }, [fields?.[0]]);

  const handleOpenChange = (change: boolean) => {
    setIsOpen(change);
  };

  const loadMoreData = () => {
    if (isLoading || isFetching) return;
    const newOffset = offset + 400;
    setOffset(newOffset);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const element = document.getElementById("table-ref");
      if (element) {
        const handleScroll = () => {
          const { scrollHeight, scrollTop, clientHeight } = element;
          if (scrollHeight <= clientHeight) return;

          const threshold = clientHeight * 10;
          if (scrollHeight - scrollTop - clientHeight < threshold) {
            loadMoreData();
          }
        };

        element.addEventListener("scroll", handleScroll);

        clearInterval(interval);

        return () => {
          element.removeEventListener("scroll", handleScroll);
        };
      }
    }, 500);

    return () => clearInterval(interval);
  }, [loadMoreData]);

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
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#FunnelSimple"
            ></use>
          </svg>
          <p className="ml-1 p-0 text-[14px] font-light leading-[18px] text-[#212123]">
            Filter
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex h-[140px] w-[580px] flex-col items-start justify-start rounded-md border px-3 py-4 text-sm shadow-elevation-high">
        <p className="opacity-70">In this view, show records</p>
        <div className="h-15 flex items-center px-2 py-3 text-sm font-light">
          <p className="w-[72px] px-2">Where</p>
          <FilterFieldDropdown
            selected={field}
            setSelected={setField}
            tableId={tableId}
          />
          <FilterContainsDropdown
            selected={operator}
            setSelected={setOperator}
          />
          <div className="flex h-7 w-[124px] cursor-pointer items-center rounded-sm border-b border-r border-t px-2 text-sm outline-none">
            <input
              type="text"
              className="m-0 h-full w-full outline-none"
              placeholder="Enter a value"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div
            className="flex h-7 w-8 cursor-pointer items-center justify-center border-b border-r border-t text-sm outline-none hover:bg-gray-200"
            onClick={handleResetFilter}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Trash"
              ></use>
            </svg>
          </div>
          <div className="flex h-7 w-8 cursor-pointer items-center justify-center border-b border-r border-t text-sm outline-none hover:bg-gray-200">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="icon flex-none"
            >
              <use
                fill="currentColor"
                href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#DotsSixVertical"
              ></use>
            </svg>
          </div>
        </div>
        <button
          className="ml-auto mr-3 h-7 rounded-md bg-[#0d70df] px-4 text-[13px] text-white shadow-elevation-low hover:bg-blue-900"
          type="button"
          onClick={handleOnClick}
        >
          {shouldFetch ? <>Loading...</> : <>Filter</>}
        </button>
      </PopoverContent>
    </Popover>
  );
}
