"use client";

import { Base } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import BaseNavBar from "../_components/BaseNavBar";
import BaseToolBar from "../_components/BaseToolBar";
import Table from "../_components/Table";
import TableToolBar from "../_components/TableToolBar";
import { table } from "console";
import Loading from "../_components/Loading";

const BasePage = () => {
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
      <div className="min-h-screen w-full">
        <BaseNavBar baseName={base?.name} />
        <BaseToolBar />
        <TableToolBar />
        <Table base={base} tableId={currentTableId} />
      </div>
    </>
  );
};

export default BasePage;
