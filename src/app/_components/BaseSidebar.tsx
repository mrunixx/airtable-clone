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
  selectedView: string;
  setSelectedView: Dispatch<SetStateAction<string>>
};

const BaseSidebar = ({
  tableId,
  tableInstanceRef,
  tableRecords,
  setTableRecords,
  selectedView, 
  setSelectedView
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

  useEffect(() => {
    setSelectedView(table?.views[0]?.id ?? "");
    setTableRecords(originalRecords ?? []);
  }, [table?.views[0]?.id])

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
        {table?.views.map((view, index) => {
          return (
            <TableViewButton
              key={index}
              view={view}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />
          );
        })}
      </div>
      <SidebarCreate tableId={tableId} setRefetchView={setRefetchView}/>
    </div>
  );
};

export default BaseSidebar;
