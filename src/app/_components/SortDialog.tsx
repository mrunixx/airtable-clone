import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SortFieldDropdown from "./SortFieldDropdown";
import SortTypeDropdown from "./SortTypeDropdown";
import { api } from "~/trpc/react";

type Props = {
  tableId: string;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  sortFieldId: string;
  setSortFieldId: Dispatch<SetStateAction<string>>;
};

export default function SortDialog({
  tableId,
  sort,
  setSort,
  sortFieldId,
  setSortFieldId,
}: Props) {
  const { data: fields, isLoading: isBaseLoading } =
    api.table.getTableHeaders.useQuery(
      { tableId: tableId },
      { refetchOnWindowFocus: true },
    );
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(() => {
    return fields?.findIndex((f) => f.id === sortFieldId) ?? 0;
  });
  const [sortDialogEntry, setSortDialogEntry] = useState(
    sort === "" ? "A → Z" : sort,
  );
  const [sortExists, setSortExists] = useState(false);

  const handleOnClick = () => {
    setIsOpen(false);
    setSortFieldId(fields?.[index]?.id ?? "");
    setSort(sortDialogEntry);
    setSortExists(true);
  };

  const handleOpenChange = (change: boolean) => {
    setIsOpen(change);
  };

  const handleRemoveSort = () => {
    setSortFieldId("");
    setSort("");
    setSortExists(false);
  };

  useEffect(() => {
    setSortExists(sortFieldId === "" ? false : true)
  }, [sortFieldId])

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
          <div className="mb-3 flex items-center gap-3">
            <SortFieldDropdown
              selected={index}
              setSelected={setIndex}
              fields={fields ?? []}
            />
            <SortTypeDropdown
              sort={sortDialogEntry}
              setSort={setSortDialogEntry}
            />
            {sortExists && (
              <div className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-sm hover:bg-gray-200">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="icon flex-none"
                  onClick={handleRemoveSort}
                >
                  <use
                    fill="currentColor"
                    href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#X"
                  ></use>
                </svg>
              </div>
            )}
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
            <div
              tabIndex={0}
              role="button"
              className="mr-1 p-1 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </div>
            <button
              className="m-2 ml-auto h-7 rounded-md bg-[#0d70df] px-2 text-[13px] text-white shadow-elevation-low"
              type="button"
              onClick={handleOnClick}
            >
              Sort
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
