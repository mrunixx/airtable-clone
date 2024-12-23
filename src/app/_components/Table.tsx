import { Base, RecordValue } from "@prisma/client";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import TableHeader from "./TableHeader";
import { api } from "~/trpc/react";
import Loading from "./Loading";
import { useMemo } from "react";

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
    })
    rowData.push(obj);
  })

  return rowData;
}

const Table = ({ base, tableId }: Props) => {
  const { data: fields, isLoading: isBaseLoading } =
    api.table.getTableHeaders.useQuery({ tableId: tableId });

  const { data: records, isLoading: isRecordsLoading } =
    api.table.getTableRecords.useQuery({ tableId: tableId });

  const colDefs: ColumnDef<Record<string, string>>[] = useMemo(() => {
    return fields?.map((f) => ({
      header: ({ column }) => <TableHeader header={f.name} index={column.id} />,
      accessorKey: f.id,
    })) ?? [];
  }, [fields])

  const rowData = useMemo(() => createRowData(records), [records]);

  const tableInstance = useReactTable<Record<string, string>>({
    data: rowData,
    columns: colDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isBaseLoading || isRecordsLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full border-t border-l border-gray-300">
      <table className="table-auto border-collapse border-gray-300">
        <thead className="bg-gray-100">
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="h-8 w-[180px] border-r border-b border-gray-300 bg-[#f4f4f4] text-left text-[13px] font-normal text-black"
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
          {tableInstance.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-r border-b border-gray-300 hover:bg-gray-50"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="h-8 w-[180px] border-r border-b border-gray-300 bg-white text-left text-[13px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
