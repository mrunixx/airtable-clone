import { Base, Field, RecordValue } from "@prisma/client";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import TableHeader from "./TableHeader";
import { api } from "~/trpc/react";
import Loading from "./Loading";
import { useEffect, useMemo, useState } from "react";

type Props = {
  base: Base;
  tableId: string;
};

const createRowData = (records: RecordValue[][] | undefined) => {
  const rowData: Record<string, string>[] = [];
  records?.forEach((r) => {
    const obj: Record<string, string> = {};
    r.forEach((v) => {
      obj[v.fieldId] = v.data;
    });
    rowData.push(obj);
  });

  return rowData;
};

const Table = ({ base, tableId }: Props) => {
  const createTableRecordMutation = api.table.createTableRecord.useMutation();

  const { data: fields, isLoading: isBaseLoading } =
    api.table.getTableHeaders.useQuery({ tableId: tableId });

  const { data: records, isLoading: isRecordsLoading } =
    api.table.getTableRecords.useQuery({ tableId: tableId });

  const [tableFields, setTableFields] = useState(fields);
  const [tableRecords, setTableRecords] = useState(records);

  useEffect(() => {
    setTableFields(fields);
    setTableRecords(records);
  }, [fields, records]);

  const colDefs: ColumnDef<Record<string, string>>[] = useMemo(() => {
    return (
      tableFields?.map((f, index) => ({
        header: ({ column }) => (
          <TableHeader header={f.name} index={column.id} />
        ),
        accessorKey: f.id,
        id: index.toString(),
      })) ?? []
    );
  }, [tableFields]);

  const rowData = useMemo(() => createRowData(tableRecords), [tableRecords]);

  const tableInstance = useReactTable<Record<string, string>>({
    data: rowData,
    columns: colDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddRecord = () => {
    if (records) {
      void createTableRecordMutation
        .mutateAsync({ tableId: tableId, rowIndex: records.length })
        .then((res) => {
          const newRecords = [...(tableRecords ?? [])]; 
          newRecords.push(res);

          setTableRecords(newRecords);
        });
    }
  };

  if (isBaseLoading || isRecordsLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full border-l border-t border-gray-300">
      <div className="flex flex-col">
        <table className="table-auto border-collapse border-b border-r border-white bg-white">
          <thead className="bg-white">
            {tableInstance.getHeaderGroups().map((headerGroup, index) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-8 w-[180px] border-b border-r border-gray-300 bg-[#f4f4f4] text-left text-[13px] font-normal text-black"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {tableInstance.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell, colIndex) => (
                  <td
                    key={cell.id}
                    className="h-8 w-[180px] border-b border-r border-gray-300 text-left text-[13px]"
                  >
                    {colIndex === 0 && (
                      <p className="ml-[5px] h-4 w-4 text-center text-xs text-gray-500">
                        {rowIndex + 1}
                      </p>
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-r border-gray-300 hover:bg-gray-100">
              <td
                className="h-8 cursor-pointer border-b border-r border-gray-300 text-left text-[13px] text-gray-500"
                onClick={handleAddRecord}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="icon ml-[5px] flex-none"
                >
                  <use
                    fill="currentColor"
                    href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
                  ></use>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex w-[240px] flex-grow border-r border-gray-300 bg-white">
          <div className="mt-auto h-[34px] w-full border-t px-2 pt-1 text-xs font-light">
            {tableInstance.getRowModel().rows.length} records
          </div>
        </div>
      </div>
      <div className="flex h-[33px] flex-grow flex-col border-b border-gray-300 bg-white">
        <div className="add-col flex h-[33px] w-[94px] cursor-pointer items-center justify-center border-r border-gray-300 bg-[#f4f4f4]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
            ></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Table;
