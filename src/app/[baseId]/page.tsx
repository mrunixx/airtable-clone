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
import { off } from "process";

const BasePage = () => {
  const tableInstanceRef = useRef(null);
  const baseId = usePathname()?.slice(1);
  const { data: base, isLoading: isBaseLoading } = api.base.getBase.useQuery(
    { id: baseId },
    { enabled: !!baseId, refetchOnWindowFocus: false },
  );

  const { data: tables, isLoading: isTablesLoading } =
    api.table.getTables.useQuery(
      { baseId: baseId },
      { enabled: !!baseId, refetchOnWindowFocus: false },
    );

  const [selectedView, setSelectedView] = useState("");
  const {
    data: view,
    isLoading: isViewLoading,
    isFetching: isViewFetching,
    refetch: refetchView,
  } = api.table.getTableView.useQuery(
    { viewId: selectedView },
    { refetchOnWindowFocus: false },
  );

  const [currentTable, setCurrentTable] = useState(tables?.[0]?.id);
  const [localTables, setLocalTables] = useState(() =>
    tables?.map(({ id, baseId, name }) => ({
      id,
      baseId,
      name,
    })),
  );

  const [tableRecords, setTableRecords] = useState<RecordValue[]>([]);
  const [filterOn, setFilterOn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterFieldId, setFilterFieldId] = useState("");
  const [filterOp, setFilterOp] = useState("contains");
  const [filterVal, setFilterVal] = useState("");
  const [sortFieldId, setSortFieldId] = useState("");
  const [sortOp, setSortOp] = useState("");
  const [viewDefined, setViewDefined] = useState(false);
  
  useEffect(() => {
    if (!isViewFetching && !isViewLoading && view) {
      setViewDefined(true);
      if (view.filterFieldId !== "") {
        setFilterOn(true);
      }
      setFilterVal(view.filterValue);
      setFilterFieldId(view.filterFieldId);
      setFilterOp(view.filterOp);
      setSortFieldId(view.sortFieldId);
      setSortOp(view.sortOp);
    }
  }, [isViewFetching, isViewLoading, view]);

  useEffect(() => {
    if (!currentTable) {
      setCurrentTable(tables?.[0]?.id);
    }
    setLocalTables(tables);
  }, [tables]);

  useEffect(() => {
    if (tableInstanceRef.current) {
      tableInstanceRef.current = null;
    }
  }, [currentTable]);

  useEffect(() => {
    setFilterOn(false);
    setViewDefined(false);
    refetchView().catch(() => console.log("view capture failed"));
  }, [selectedView])

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
          filterOn={filterOn}
          setFilterOn={setFilterOn}
          value={searchValue}
          setSearchValue={setSearchValue}
          filterFieldId={filterFieldId}
          setFilterFieldId={setFilterFieldId}
          filterOp={filterOp}
          setFilterOp={setFilterOp}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
          sortFieldId={sortFieldId}
          setSortFieldId={setSortFieldId}
          sortOp={sortOp}
          setSortOp={setSortOp}
        />
        <div className="flex h-full flex-grow overflow-hidden bg-[#f8f8f8]">
          <BaseSidebar
            tableInstanceRef={tableInstanceRef}
            tableId={currentTable ?? ""}
            tableRecords={tableRecords}
            setTableRecords={setTableRecords}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          <Table
            key={currentTable}
            tableId={currentTable ?? ""}
            tableInstanceRef={tableInstanceRef}
            tableRecords={tableRecords}
            setTableRecords={setTableRecords}
            filterOn={filterOn}
            searchValue={searchValue}
            selectedView={selectedView}
            filterFieldId={filterFieldId}
            setFilterFieldId={setFilterFieldId}
            filterOp={filterOp}
            setFilterOp={setFilterOp}
            filterVal={filterVal}
            setFilterVal={setFilterVal}
            sortFieldId={sortFieldId}
            setSortFieldId={setSortFieldId}
            sortOp={sortOp}
            setSortOp={setSortOp}
            viewDefined={viewDefined}
          />
        </div>
      </div>
    </>
  );
};

export default BasePage;
