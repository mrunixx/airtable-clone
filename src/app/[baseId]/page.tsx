"use client";

import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";
import BaseNavBar from "../_components/BaseNavBar";
import BaseToolBar from "../_components/BaseToolBar";
import Table from "../_components/Table";
import TableToolBar from "../_components/TableToolBar";
import Loading from "../_components/Loading";
import BaseSidebar from "../_components/BaseSidebar";
import { useEffect, useRef, useState } from "react";
import { RecordValue } from "@prisma/client";

const BasePage = () => {
  const tableInstanceRef = useRef(null);
  const baseId = usePathname()?.slice(1);
  const { data: base, isLoading: isBaseLoading } = api.base.getBase.useQuery(
    { id: baseId },
    { enabled: !!baseId },
  );

  const { data: tables, isLoading: isTablesLoading } =
    api.table.getTables.useQuery({ baseId: baseId }, { enabled: !!baseId });

  const [currentTable, setCurrentTable] = useState(tables?.[0]?.id);
  const [localTables, setLocalTables] = useState(tables);
  const [tableRecords, setTableRecords] = useState<RecordValue[]>([]);
  useEffect(() => {
    if (!currentTable) {
      setCurrentTable(tables?.[0]?.id);
    }
    setLocalTables(tables)
  }, [tables]);

  useEffect(() => {
    if (tableInstanceRef.current) {
      tableInstanceRef.current = null; 
    }
  }, [currentTable]);

  if (isBaseLoading || isTablesLoading || !base) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex h-screen min-h-screen w-full flex-col overflow-hidden">
        <BaseNavBar baseName={base?.name} />
        <BaseToolBar
          tables={localTables ?? []}
          setLocalTables={setLocalTables}
          currentTable={currentTable ?? ""}
          setCurrentTable={setCurrentTable}
          baseId={baseId}
        />
        <TableToolBar
          tableInstanceRef={tableInstanceRef}
          tableId={currentTable ?? ""}
          tableRecords={tableRecords}
          setTableRecords={setTableRecords} 
        />
        <div className="flex h-full flex-grow overflow-hidden bg-[#f8f8f8]">
          <BaseSidebar />
          <Table
            key={currentTable}
            tableId={currentTable ?? ""}
            tableInstanceRef={tableInstanceRef}
            tableRecords={tableRecords}
            setTableRecords={setTableRecords}
          />
        </div>
      </div>
    </>
  );
};

export default BasePage;
