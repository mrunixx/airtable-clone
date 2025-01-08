import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import FilterFieldDropdown from "./FilterFieldDropdown";
import FilterContainsDropdown from "./FilterContainsDropdown";
import { api } from "~/trpc/react";
import SortFieldDropdown from "./SortFieldDropdown";
import SortTypeDropdown from "./SortTypeDropdown";

type Props = {
  title: string;
  children?: React.ReactNode;
  tableId: string;
  setRefetchView?: Dispatch<SetStateAction<boolean>>
};

const ViewPopUp = ({ title, children, tableId, setRefetchView }: Props) => {
  const { data: fields } = api.table.getTableHeaders.useQuery(
    { tableId: tableId },
    { refetchOnWindowFocus: false },
  );
  const viewMutation = api.table.createTableView.useMutation();

  const [viewTitle, setViewTitle] = useState("Grid View");
  const [isOpen, setIsOpen] = useState(false);
  const [filterField, setFilterField] = useState(fields?.[0]);
  const [filterOperator, setFilterOperator] = useState("contains");
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  const [sort, setSort] = useState("A → Z");

  const handleOpenChange = (change: boolean) => {
    setIsOpen(change);
  };

  const handleResetFilter = () => {
    setInput("");
  };

  const handleSetPreset = () => {
    viewMutation.mutateAsync({
      title: viewTitle,
      tableId: tableId,
      filterFieldId: filterField?.id || " ",
      filterOperator: filterOperator,
      filterValue: input,
      sortFieldId: fields?.[index]?.id || " ",
      sortOperator: sort,
    }).then(() => {
      if (setRefetchView) {
        setRefetchView(true);
      }
    });
    setIsOpen(false);
  };

  return (
    <Popover
      placement="right-start"
      showArrow={false}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <PopoverTrigger>
        <div
          tabIndex={0}
          role="button"
          className="flex h-8 w-full items-center px-3 hover:bg-[#f1f1f2]"
        >
          {children}
          <div className={`text-sm ${children ? "mx-2" : "mr-2"}`}>{title}</div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="quiet ml-auto flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
            ></use>
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-start justify-start rounded-md p-4 text-sm shadow-elevation-high">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="h-8 w-full rounded-md border-gray-400 bg-[#f2f4f8] px-2 outline-none focus:border-2"
            placeholder="Grid View"
            value={viewTitle}
            onChange={(e) => setViewTitle(e.target.value)}
          />
          <p className="">Filter</p>
          <div className="">
            <div className="h-15 flex items-center px-2 py-3 text-sm font-light">
              <p className="w-[72px] px-2">Where</p>
              <FilterFieldDropdown
                selected={filterField}
                setSelected={setFilterField}
                tableId={tableId}
              />
              <FilterContainsDropdown
                selected={filterOperator}
                setSelected={setFilterOperator}
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
          </div>
          <p>Sort</p>
          <div className="mb-3 flex items-center gap-3">
            <SortFieldDropdown
              selected={index}
              setSelected={setIndex}
              tableId={tableId}
            />
            <SortTypeDropdown sort={sort} setSort={setSort} />
            <div className="cursorp-pointer flex h-7 w-7 items-center justify-center rounded-sm hover:bg-gray-200">
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
          <button
            className="ml-auto h-7 rounded-md bg-[#0d70df] px-2 text-[13px] text-white shadow-elevation-low hover:bg-blue-600"
            onClick={handleSetPreset}
          >
            Add Preset
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ViewPopUp;
