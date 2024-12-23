import { Base } from "@prisma/client";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

type Props = {
  base: Base | null;
};

type RowData = {
  name: string;
  notes: string;
  assignee: string;
  status: string;
}

const defaultRowData = [
  {
    name: "",
    notes: "",
    assignee: "",
    status: "",
  },
  {
    name: "",
    notes: "",
    assignee: "",
    status: "",
  },
  {
    name: "",
    notes: "",
    assignee: "",
    status: "",
  },
];

const defaultColumnDef: ColumnDef<RowData>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "notes", header: "Notes" },
  { accessorKey: "assignee", header: "Assignee" },
  { accessorKey: "status", header: "Status" },
];

const Table = ({ base }: Props) => {
  const tableInstance = useReactTable<RowData>({
    data: defaultRowData,
    columns: defaultColumnDef,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <table className="table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="h-8 w-[180px] border text-left text-black font-normal text-[13px] bg-[#f4f4f4]">
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
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="h-8 w-[180px] border text-left text-[13px]">
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
