import { MutableRefObject } from "react";
import SortDialog from "./SortDialog";
import { Table } from "@tanstack/react-table";

type Props = {
  tableInstanceRef: MutableRefObject<Table<Record<string, string>>> | MutableRefObject<null>;
  tableId: string
}

const TableToolBar = ({ tableInstanceRef, tableId } : Props) => {
  return (
    <div className="toolbar flex h-11 w-full items-center pl-3 pr-4">
      <div
        className="views-sidebar mr-2 flex h-[26px] items-center justify-center rounded-sm px-1.5 hover:bg-[#f1f1f2]"
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
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#List"
          ></use>
        </svg>
        <p className="ml-1 p-0 text-[14px] leading-[18px] text-[#212123]">
          Views
        </p>
      </div>
      <div className="ml-1 mr-3 h-4 w-[1px] bg-[#c0c0c0]"></div>
      <div
        className="grid-view-options flex h-[26px] items-center justify-center rounded-sm px-2 hover:bg-[#f1f1f2]"
        role="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none">
          <title>grid</title>
          <use
            fill="rgb(22, 110, 225)"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#GridFeature"
          ></use>
        </svg>
        <p className="ml-2 p-0 text-[14px] leading-[18px] text-[#212123]">
          Grid view
        </p>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="icon mx-2 flex-none"
        >
          <title>team</title>
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#UsersThree"
          ></use>
        </svg>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="mt-half flex-none"
        >
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
          ></use>
        </svg>
      </div>
      <div
        className="grid-view-options mr-2 pl-4 flex h-[26px] items-center justify-center rounded-sm px-2 py-1 hover:bg-[#f1f1f2]"
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
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#EyeSlash"
          ></use>
        </svg>
        <p className="ml-1 p-0 text-[14px] leading-[18px] text-[#212123] font-light">
          Hide fields
        </p>
      </div>
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
        <p className="ml-1 p-0 text-[14px] leading-[18px] text-[#212123] font-light">
          Filter
        </p>
      </div>
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
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Group"
          ></use>
        </svg>
        <p className="ml-1 p-0 text-[14px] leading-[18px] text-[#212123] font-light">
          Group
        </p>
      </div>
      <SortDialog tableInstanceRef={tableInstanceRef} tableId={tableId}/> 
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
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#PaintBucket"
          ></use>
        </svg>
        <p className="ml-1 p-0 text-[14px] leading-[18px] text-[#212123] font-light">
          Color
        </p>
      </div>
      <div
        className="grid-view-options mr-2 flex h-[26px] items-center justify-center rounded-sm px-2 py-1 hover:bg-[#f1f1f2]"
        role="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none">
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#RowHeightSmall"
          ></use>
        </svg>
      </div>
      <div
        className="grid-view-options mr-2 flex h-[26px] items-center justify-center rounded-sm px-2 py-1 hover:bg-[#f1f1f2]"
        role="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none">
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ArrowSquareOut"
          ></use>
        </svg>
        <p className="ml-1 p-0 text-[14px] leading-[18px] text-[#212123] font-light">
          Share and sync
        </p>
      </div>
      <div className="ml-auto flex items-center justify-center" role="button">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="noevents flex-none font-light hover:font-strong"
        >
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#MagnifyingGlass"
          ></use>
        </svg>
      </div>
    </div>
  );
};

export default TableToolBar;
