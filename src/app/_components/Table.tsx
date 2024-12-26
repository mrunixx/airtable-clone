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
import NewFieldDialog from "./NewFieldDialog";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import NewRecordButton from "./NewRecordButton";

type Props = {
  base: Base;
  tableId: string;
};

const Table = ({ base, tableId }: Props) => {
  const createTableRecordMutation = api.table.createTableRecord.useMutation();
  const createTableFieldMutation = api.table.createTableField.useMutation();

  const { data: fields, isLoading: isBaseLoading } =
    api.table.getTableHeaders.useQuery({ tableId: tableId });
  const [tableFields, setTableFields] = useState(fields);

  const {
    data: records,
    isLoading: isRecordsLoading,
    refetch,
  } = api.table.getTableRecordValues.useQuery({ tableId: tableId });
  const [tableRecords, setTableRecords] = useState(records || []);

  useEffect(() => {
    if (fields) {
      setTableFields(fields);
      console.log(
        "TableField IDs:",
        tableFields?.map((f) => f.id),
      );
    }
    if (records) {
      setTableRecords(records);
    }
  }, [fields, records]);

  const transformedData = useMemo(() => {
    const grouped: Record<string, Record<string, any>> = {};

    tableRecords.forEach((record) => {
      const { recordId, fieldId, data } = record;
      if (!grouped[recordId]) {
        grouped[recordId] = { recordId };
      }
      grouped[recordId][fieldId] = data;
    });

    return Object.values(grouped);
  }, [tableRecords]);

  const colDefs: ColumnDef<Record<string, string>>[] = useMemo(() => {
    return (
      tableFields?.map((field, index) => ({
        header: ({ column }) => (
          <TableHeader header={field.name} index={column.id} />
        ),
        id: index.toString(),
        accessorKey: field.id,
        cell: ({ row }) => {
          return (
            <TableCell
              fieldId={field.id}
              data={row.original[field.id]}
              recordId={row.original.recordId}
            />
          );
        },
      })) ?? []
    );
  }, [tableFields]);

  const tableInstance = useReactTable<Record<string, string>>({
    data: transformedData,
    columns: colDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddRecord = () => {
    if (tableRecords) {
      void createTableRecordMutation
        .mutateAsync({ tableId: tableId, rowIndex: tableRecords.length })
        .then((res) => {
          const newRecords = [...(tableRecords ?? [])];
          for (const r of res) {
            newRecords.push(r);
          }

          setTableRecords(newRecords);
        });
    }
  };

  const handleAddField = (input: string) => {
    void createTableFieldMutation
      .mutateAsync({ name: input, tableId: tableId })
      .then((res) => {
        const newFields = [...(tableFields ?? [])];
        newFields.push(res);
        refetch().then(() => {
          setTableFields(newFields);
        });
      });
  };

  if (isBaseLoading || isRecordsLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full border-l border-t border-gray-300">
      <div className="flex flex-col">
        <TableRow>
          {tableInstance.getHeaderGroups().map((headerGroup) => {
            {
              return headerGroup.headers.map((header, index) => {
                {
                  return flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  );
                }
              });
            }
          })}
        </TableRow>
        {tableInstance.getRowModel().rows.map((row, index) => (
          <TableRow key={index}>
            {row.getVisibleCells().map((cell, colIndex) => {
              return (
                <>
                  {colIndex === 0 && (
                    <div className="flex w-[66px] items-center bg-transparent pr-[35px]">
                      <p className="ml-[5px] h-4 w-4 text-center text-xs text-gray-500">
                        {index + 1}
                      </p>
                    </div>
                  )}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </>
              );
            })}
          </TableRow>
        ))}
        <div
          className="flex h-8 cursor-pointer flex-col border-b border-r border-gray-300 bg-white text-left text-[13px] text-gray-500 hover:bg-gray-50"
          onClick={handleAddRecord}
        >
          <NewRecordButton />
        </div>
        <div className="flex h-full w-[248px] border-r border-gray-300 bg-white">
          <div className="mt-auto h-[34px] w-full border-t px-2 pt-1 text-xs font-light">
            {tableInstance.getRowModel().rows.length} records
          </div>
        </div>
      </div>
      <div className="flex h-8 w-full border-b border-gray-300 bg-white">
        <NewFieldDialog handleClick={handleAddField} />
      </div>
    </div>
  );
};

export default Table;
