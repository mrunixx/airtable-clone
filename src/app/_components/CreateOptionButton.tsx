import { table } from "console";
import ViewPopUp from "./ViewPopUp";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
  tableId?: string;
  setRefetchView?: Dispatch<SetStateAction<boolean>>
};


const CreateOptionButton = ({ title, children, tableId, setRefetchView }: Props) => {
  return title !== "Grid" ? (
    <div tabIndex={0} role="button" className="flex px-3 h-8 items-center w-full hover:bg-[#f1f1f2]">
      {children}
      <div className={`text-sm ${children ? "mx-2" : "mr-2"}`}>{title}</div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="quiet flex-none ml-auto"
      >
        <use
          fill="currentColor"
          href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
        ></use>
      </svg>
    </div>
  ) : (<ViewPopUp title={title} tableId={tableId || ""} setRefetchView={setRefetchView}>{children}</ViewPopUp>);
};

export default CreateOptionButton;
