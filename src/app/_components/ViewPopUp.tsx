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
  setRefetchView?: Dispatch<SetStateAction<number>>;
};

const ViewPopUp = ({ title, children, tableId, setRefetchView }: Props) => {
  const { data: fields } = api.table.getTableHeaders.useQuery(
    { tableId: tableId },
    { refetchOnWindowFocus: false },
  );
  const viewMutation = api.table.createTableView.useMutation();

  const [viewTitle, setViewTitle] = useState("Grid View");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (change: boolean) => {
    setIsOpen(change);
  };

  const handleSetPreset = async () => {
    await viewMutation
      .mutateAsync({
        title: viewTitle,
        tableId: tableId,
      })
      .then(() => {
        if (setRefetchView) {
          setRefetchView((prev) => prev + 1);
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
      <PopoverContent className="flex w-[400px] flex-col items-start justify-start rounded-md p-5 text-sm shadow-elevation-high">
        <div className="flex w-full flex-col gap-2">
          <input
            type="text"
            className="mb-6 h-8 w-full rounded-md border-gray-400 bg-[#f2f4f8] px-2 text-lg outline-none focus:border-2"
            placeholder="Grid View"
            value={viewTitle}
            onChange={(e) => setViewTitle(e.target.value)}
          />
          <p className="text-[16px] font-light">Who can edit</p>
          <fieldset className="flex justify-between">
            <div className="flex items-center gap-1 font-light">
              <input type="radio" name="collab" id="locked" />
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="mx-half flex-none"
              >
                <use
                  fill="currentColor"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#UsersThree"
                ></use>
              </svg>
              Collaborative
            </div>
            <div className="flex items-center gap-1 font-light">
              <input type="radio" name="personal" id="locked" />
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="mx-half flex-none"
              >
                <use
                  fill="currentColor"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#User"
                ></use>
              </svg>
              Personal
            </div>
            <div className="flex items-center gap-1 font-light">
              <input type="radio" name="locked" id="locked" />
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="mx-half flex-none"
              >
                <use
                  fill="currentColor"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Lock"
                ></use>
              </svg>
              Locked
            </div>
          </fieldset>
          <p className="opacity-70">
            All collaborators can edit the configuration
          </p>
          <div className="flex justify-end gap-1">
            <button
              className="h-9 rounded-md px-2 text-[13px] text-black"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="h-9 rounded-md bg-[#0d70df] px-2 text-[13px] text-white shadow-elevation-low hover:bg-blue-600"
              onClick={handleSetPreset}
            >
              Create new view
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ViewPopUp;
