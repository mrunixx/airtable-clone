import { Base, Field, RecordValue } from "@prisma/client";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import TableHeader from "./TableHeader";
import { api } from "~/trpc/react";
import Loading from "./Loading";
import { useEffect, useMemo, useRef, useState } from "react";
import NewFieldDialog from "./NewFieldDialog";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import NewRecordButton from "./NewRecordButton";
import { keepPreviousData } from "@tanstack/react-query";

type Props = {
  tableId: string;
};

const Table = ({ tableId }: Props) => {
  const createTableRecordMutation = api.table.createTableRecord.useMutation();
  const createTableFieldMutation = api.table.createTableField.useMutation();
  const createBatchTableRecordMutation =
    api.table.create15000Records.useMutation();
  const { data: fields, isLoading: isBaseLoading } =
    api.table.getTableHeaders.useQuery(
      { tableId: tableId },
      { refetchOnWindowFocus: false, placeholderData: keepPreviousData },
    );
  const {
    data: records,
    isLoading: isRecordsLoading,
    refetch,
  } = api.table.getTableRecordValues.useQuery(
    { tableId: tableId },
    { refetchOnWindowFocus: false, placeholderData: keepPreviousData },
  );

  const [tableFields, setTableFields] = useState(fields);
  const [tableReady, setTableReady] = useState(false);
  const [tableRecords, setTableRecords] = useState(records ?? []);
  const [clickable, setClickable] = useState(true);

  const transformedData = useMemo(() => {
    const grouped: Record<string, Record<string, string>> = {};

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
              rowIndex={tableRecords[row.index]?.recordId}
            />
          );
        },
      })) ?? []
    );
  }, [tableFields]);

  const handleAddRecord = () => {
    if (tableRecords && clickable) {
      setClickable(false);
      void createTableRecordMutation
        .mutateAsync({ tableId: tableId, rowIndex: tableRecords.length })
        .then((res) => {
          const newRecords = [...(tableRecords ?? []), ...res];
          setTableRecords(newRecords);
          setClickable(true);
        });
    }
  };

  const handleAddRecordBatch = async () => {
    setTableReady(false);
    const recordValuesToAdd: RecordValue[] = [];

    tableFields?.forEach((tf) => {
      for (let i = 0; i < 15000; i++) {
        const recordId = `${tf.id}-record-${i}`;
        const recordValueObj = {
          id: `${recordId}-${tf.id}`,
          data: "",
          recordId: recordId,
          fieldId: tf.id,
        };
        recordValuesToAdd.push(recordValueObj);
      }
    });

    const newRecords = [...tableRecords, ...recordValuesToAdd];
    setTableRecords(newRecords);
    setTableReady(true);

    if (tableFields) {
      try {
        await createBatchTableRecordMutation.mutateAsync({
          tableId: tableId,
          fieldIds: tableFields.map((t) => t.id),
        });
      } catch (error) {
        console.error("Error creating batch records:", error);
      }
    }
  };

  const handleAddField = (input: string) => {
    void createTableFieldMutation
      .mutateAsync({ name: input, tableId: tableId })
      .then((res) => {
        const newFields = [...(tableFields ?? [])];
        newFields.push(res);
        void refetch().then(() => {
          setTableFields(newFields);
        });
      });
  };

  const tableInstance = useReactTable<Record<string, string>>({
    data: transformedData,
    columns: colDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableInstance.getRowModel().rows.length > 0) {
      setTableReady(true);
    }
  }, [tableInstance.getRowModel().rows]);

  useEffect(() => {
    if (fields) {
      setTableFields(fields);
    }
    if (records) {
      console.log(records);
      setTableRecords(records);
    }
  }, [fields, records]);

  if (isBaseLoading || isRecordsLoading || !tableReady) {
    return <Loading />;
  }

  return (
    <div
      className="flex w-full overflow-y-scroll border-l border-t border-gray-300"
      ref={parentRef}
    >
      <div className="flex flex-col">
        <TableRow>
          {tableInstance.getHeaderGroups().map((headerGroup) => {
            {
              return headerGroup.headers.map((header, index) => {
                {
                  return (
                    <div key={index} className="m-0 p-0">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      ;
                    </div>
                  );
                }
              });
            }
          })}
        </TableRow>
        {tableInstance.getRowModel().rows.map((row, index) => {
          return (
            <TableRow key={index}>
              {row.getVisibleCells().map((cell, colIndex) => {
                return (
                  <div key={cell.id} className="m-0 flex p-0">
                    {colIndex === 0 && (
                      <div className="flex w-[66px] items-center bg-transparent pr-[35px]">
                        <p className="ml-[5px] h-4 w-4 text-center text-xs text-gray-500">
                          {index + 1}
                        </p>
                      </div>
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                );
              })}
            </TableRow>
          );
        })}
        <div
          className={`flex h-8 ${clickable ? "cursor-pointer" : "cursor-wait"} flex-col border-b border-r border-gray-300 bg-white text-left text-[13px] text-gray-500 hover:bg-gray-50`}
          onClick={handleAddRecord}
        >
          <NewRecordButton />
        </div>
        <div
          className="flex h-8 cursor-pointer flex-col border-b border-r border-gray-300 bg-white text-left text-[13px] text-red-600 hover:bg-red-500 hover:text-white"
          onClick={handleAddRecordBatch}
        >
          <NewRecordButton>ADD 15000 RECORDS</NewRecordButton>
        </div>
        <div className="flex h-full">
          <div className="flex h-full w-[242px] border-r border-gray-300 bg-white">
            <div className="mt-auto h-[34px] w-full border-t border-gray-300 px-2 pt-1 text-xs font-light">
              {tableInstance.getRowModel().rows.length} records
            </div>
          </div>
          <div className="h-[34px] flex flex-grow self-end border-t border-gray-300 bg-white"></div>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex h-8 w-full border-b border-gray-300 bg-white">
          <NewFieldDialog handleClick={handleAddField} />
        </div>
          <div className="h-[34px] border-t border-gray-300 bg-white"></div>
      </div>
    </div>
  );
};

export default Table;
