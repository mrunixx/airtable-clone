import { api } from "~/trpc/react";
import SidebarCreate from "./SidebarCreate";
import SideViewSearch from "./SideViewSearch";
import TableViewButton from "./TableViewButton";
import Loading from "./Loading";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";
import { RecordValue } from "@prisma/client";

type Props = {
  tableInstanceRef:
    | MutableRefObject<Table<Record<string, string>>>
    | MutableRefObject<null>;
  tableId: string;
  tableRecords: RecordValue[];
  setTableRecords: Dispatch<SetStateAction<RecordValue[]>>;
};

const BaseSidebar = ({
  tableId,
  tableInstanceRef,
  tableRecords,
  setTableRecords,
}: Props) => {
  const [refetchView, setRefetchView] = useState(0)
  const { data: table, isLoading, refetch } = api.table.getTable.useQuery({
    tableId: tableId,
  }, {refetchOnWindowFocus: false});
  const { data: originalRecords } = api.table.getTableRecordValues.useQuery({
    tableId: tableId,
    offset: 0,
    limit: 400,
  }, {
    refetchOnWindowFocus: false
  });

  const [selectedView, setSelectedView] = useState("");

  const handleReset = () => {
    setSelectedView("");
    setTableRecords(originalRecords ?? []);
    tableInstanceRef.current?.getAllColumns()[0]?.clearSorting()
  };

  useEffect(() => {
    refetch().catch(() => console.log("failed refetch of views"));
  }, [refetchView])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-[260px] min-w-[260px] flex-col border-t bg-white pt-2">
      <SideViewSearch />
      <div className="curr-view mx-4 mt-2 flex flex-col gap-2 rounded-sm">
        <div
          tabIndex={0}
          role="button"
          className={`flex h-8 w-full items-center p-2 hover:bg-[#d5f1ff] ${selectedView === "" ? "bg-[#d5f1ff]" : ""}`}
          onClick={handleReset}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-darken4 flex-none"
          >
            <use
              fill="rgb(22, 110, 225)"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#GridFeature"
            ></use>
          </svg>
          <div className={`mx-2 text-sm`}>Normal View</div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            className="icon ml-auto flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Check"
            ></use>
          </svg>
        </div>
        {table?.views.map((view, index) => {
          return (
            <TableViewButton
              key={index}
              view={view}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
              tableInstanceRef={tableInstanceRef}
              tableRecords={tableRecords}
              setTableRecords={setTableRecords}
            />
          );
        })}
      </div>
      <SidebarCreate tableId={tableId} setRefetchView={setRefetchView}/>
    </div>
  );
};

export default BaseSidebar;
