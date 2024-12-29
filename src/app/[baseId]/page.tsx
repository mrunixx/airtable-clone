"use client";

import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";
import BaseNavBar from "../_components/BaseNavBar";
import BaseToolBar from "../_components/BaseToolBar";
import Table from "../_components/Table";
import TableToolBar from "../_components/TableToolBar";
import Loading from "../_components/Loading";
import BaseSidebar from "../_components/BaseSidebar";
import { useRef } from "react";

const BasePage = () => {
  const tableInstanceRef = useRef(null)
  const baseId = usePathname()?.slice(1);

  const { data: base, isLoading: isBaseLoading } = api.base.getBase.useQuery(
    { id: baseId },
    { enabled: !!baseId },
  );

  const { data: tables, isLoading: isTablesLoading } =
    api.table.getTables.useQuery({ baseId: baseId }, { enabled: !!baseId });

  const currentTableId = tables?.[0]?.id;

  if (isBaseLoading || isTablesLoading || !base) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen h-screen w-full flex flex-col overflow-hidden">
        <BaseNavBar baseName={base?.name} />
        <BaseToolBar />
        <TableToolBar tableInstanceRef={tableInstanceRef} tableId={currentTableId ?? ""}/>
        <div className="flex flex-grow overflow-hidden bg-[#f8f8f8] h-full">
          <BaseSidebar />
          <Table tableId={currentTableId ?? ""} tableInstanceRef={tableInstanceRef}/>
        </div>
      </div>
    </>
  );
};

export default BasePage;
