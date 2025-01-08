import { RecordValue, View } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { api } from "~/trpc/react";

type Props = {
  view: View
  selectedView: string;
  setSelectedView: Dispatch<SetStateAction<string>>
  tableInstanceRef: MutableRefObject<Table<Record<string, string>>> | MutableRefObject<null>;
  tableRecords: RecordValue[];
  setTableRecords: Dispatch<SetStateAction<RecordValue[]>>  
}

const TableViewButton = ({ view, selectedView, setSelectedView, tableInstanceRef, tableRecords, setTableRecords }: Props) => {

  const [offset, setOffset] = useState(0);

  const {
    data: records,
    isLoading,
    isFetching,
  } = api.table.getFilteredRecordValues.useQuery(
    {
      value: view.filterValue,
      field: view.filterFieldId,
      operator: view.filterOp,
      tableId: view.tableId,
      offset: offset,
      limit: 400,
    },
    {
      enabled: selectedView === view.id
    }
  );

  const handleClick = () => {
    setSelectedView(view.id);
    setTableRecords(records ?? []);
    if (view.sortOp === "A → Z") {
      tableInstanceRef.current?.getAllColumns()[0]?.toggleSorting(false, false);
    } else {
      tableInstanceRef.current?.getAllColumns()[0]?.toggleSorting(true, false);
    }
  }


  useEffect(() => {
    if (!isLoading && !isFetching && records) {
      setTableRecords((prev) => [...prev, ...records]);
    }
  }, [isLoading, isFetching, records]);

  return (
    <div
      tabIndex={0}
      role="button"
      className={`flex h-8 w-full items-center p-2 hover:bg-[#d5f1ff] ${selectedView === view.id ? "bg-[#d5f1ff]" : ""}`}
      onClick={handleClick}
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
      <div className={`mx-2 text-sm`}>{view.title}</div>
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
  );
};

export default TableViewButton;
