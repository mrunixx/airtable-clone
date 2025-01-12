import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  Header,
  Table,
} from "@tanstack/react-table";
import TableHeader from "./TableHeader";
import { api } from "~/trpc/react";
import Loading from "./Loading";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import NewFieldDialog from "./NewFieldDialog";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import NewRecordButton from "./NewRecordButton";
import { Field, RecordValue } from "@prisma/client";

type Props = {
  tableId: string;
  tableInstanceRef:
    | MutableRefObject<Table<Record<string, string>>>
    | MutableRefObject<null>;
  tableRecords: RecordValue[];
  setTableRecords: Dispatch<SetStateAction<RecordValue[]>>;
  filterOn: boolean;
  searchValue: string;
  selectedView: string;
  filterFieldId: string;
  setFilterFieldId: Dispatch<SetStateAction<string>>;
  filterOp: string;
  setFilterOp: Dispatch<SetStateAction<string>>;
  filterVal: string;
  setFilterVal: Dispatch<SetStateAction<string>>;
  sortOp: string;
  setSortOp: Dispatch<SetStateAction<string>>;
  sortFieldId: string;
  setSortFieldId: Dispatch<SetStateAction<string>>;
  viewDefined: boolean;
};

const TanstackTable = ({
  tableId,
  tableInstanceRef,
  tableRecords,
  setTableRecords,
  searchValue,
  selectedView,
  filterFieldId,
  filterOp,
  filterVal,
  sortOp,
  sortFieldId,
  setFilterFieldId,
  setFilterOp,
  setFilterVal,
  setSortOp,
  setSortFieldId,
  viewDefined,
}: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const createTableRecordMutation = api.table.createTableRecord.useMutation();
  const createTableFieldMutation = api.table.createTableField.useMutation();
  const createBatchTableRecordMutation =
    api.table.create15000Records.useMutation();
  const { data: fields, isLoading: isBaseLoading } =
    api.table.getTableHeaders.useQuery(
      { tableId: tableId },
      { refetchOnWindowFocus: false },
    );
  const {
    data: records,
    isLoading: isRecordsLoading,
    isFetching: isRecordsFetching,
    refetch: refetchRecords,
  } = api.table.getFilteredRecordValues.useQuery(
    {
      tableId: tableId,
      filterFieldId: filterFieldId,
      filterOperator: filterOp,
      filterValue: filterVal,
      sortFieldId: sortFieldId,
      sortOp: sortOp,
      offset: offset,
      limit: 400,
    },
    { enabled: viewDefined, refetchOnWindowFocus: false },
  );

  const [tableFields, setTableFields] = useState(fields);
  const [tableReady, setTableReady] = useState(false);
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
              setTableRecords={setTableRecords}
              fieldId={field.id}
              data={row.original[field.id]}
              recordId={row.original.recordId}
              rowIndex={tableRecords[row.index]?.recordId}
              searchValue={searchValue}
            />
          );
        },
      })) ?? []
    );
  }, [tableFields, searchValue, tableRecords]);
  const viewMutation = api.table.updateTableView.useMutation();

  const updateTableView = async () => {
    await viewMutation
      .mutateAsync({
        viewId: selectedView,
        filterFieldId: filterFieldId,
        filterOp: filterOp,
        filterValue: filterVal,
        sortOp: sortOp,
        sortFieldId: sortFieldId,
      })
      .then(async () => {
        setTableRecords([]);
        setOffset(0);
        await refetchRecords();
      });
  };

  useEffect(() => {
    if (viewDefined) {
      void updateTableView();
    }
  }, [filterFieldId, filterVal, filterOp, sortFieldId, sortOp]);

  useEffect(() => {
    setTableRecords([]);
    setFilterFieldId("");
    setFilterOp("contains");
    setFilterVal("");
    setSortOp("");
    setSortFieldId("");
  }, [selectedView]);

  const handleAddRecord = async () => {
    if (tableRecords && clickable) {
      setClickable(false);
      await createTableRecordMutation
        .mutateAsync({
          tableId: tableId,
          rowIndex: tableRecords.length / (tableFields?.length ?? 1),
        })
        .then((res) => {
          const newRecords = [...(tableRecords ?? []), ...res];
          setTableRecords(newRecords);
          setClickable(true);
        });
    }
  };

  const handleAddRecordBatch = async () => {
    if (tableFields) {
      try {
        setTableReady(false);
        await createBatchTableRecordMutation.mutateAsync({
          tableId: tableId,
          fieldIds: tableFields.map((t) => t.id),
        });
        setOffset(0);
        await refetchRecords().then(() => {
          setTableReady(true);
        });
      } catch (error) {
        console.error("Error creating batch records:", error);
      }
    }
  };

  const handleAddField = async (input: string) => {
    const newRvs: RecordValue[] = [];

    const newField: Field = {
      id: `field-${crypto.randomUUID()}`,
      name: input,
      tableId: tableId,
    };

    for (const record of tableInstance.getRowModel().rows) {
      const recordId = record.original.recordId ?? "";
      const newRv: RecordValue = {
        id: `${recordId}-${newField.id}`,
        data: "",
        fieldId: newField.id,
        recordId: recordId,
      };
      newRvs.push(newRv);
    }
    const newFields = [...(tableFields ?? []), newField];
    const newRecords = [...(tableRecords ?? []), ...newRvs];
    setTableFields(newFields);
    setTableRecords(newRecords);
    await createTableFieldMutation.mutateAsync(newField);
  };

  const tableInstance = useReactTable<Record<string, string>>({
    data: transformedData,
    columns: colDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  tableInstanceRef.current = tableInstance;

  const loadMoreData = () => {
    if (isRecordsLoading || isRecordsFetching) return;
    const newOffset = offset + 400;
    setOffset(newOffset);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const element = parentRef.current;
      if (element) {
        const handleScroll = () => {
          const { scrollHeight, scrollTop, clientHeight } = element;
          if (scrollHeight <= clientHeight) return;

          const threshold = clientHeight * 10;
          if (scrollHeight - scrollTop - clientHeight < threshold) {
            loadMoreData();
          }
        };

        element.addEventListener("scroll", handleScroll);

        clearInterval(interval);

        return () => {
          element.removeEventListener("scroll", handleScroll);
        };
      }
    }, 500);

    return () => clearInterval(interval);
  }, [loadMoreData]);

  useEffect(() => {
    if (tableInstance.getRowModel().rows.length > 0) {
      setTableReady(true);
    }
  }, [tableInstance.getRowModel().rows]);

  useEffect(() => {
    if (!isRecordsLoading && !isRecordsFetching && records) {
      setTableRecords((prev) => [...prev, ...records]);
    }
  }, [isRecordsLoading, isRecordsFetching, records]);

  useEffect(() => {
    if (fields) {
      setTableFields(fields);
    }
  }, [fields]);

  useEffect(() => {
    if (!isBaseLoading && !isRecordsFetching) {
      setTableReady(true);
    }
  }, [isBaseLoading, isRecordsLoading]);

  useEffect(() => {
    setTableReady(false);
    setTableRecords([]);
    setOffset(0);
    void refetchRecords();
  }, [tableId]);

  useEffect(() => {
    if (viewDefined) {
      void refetchRecords();
    }
  }, [viewDefined])

  if (isBaseLoading || !tableReady) {
    return <Loading />;
  }

  return (
    <div
      className="flex w-full overflow-y-scroll border-l border-t border-gray-300"
      id="table-ref"
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
              {row?.getVisibleCells().map((cell, colIndex) => {
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
          className={`flex h-8 ${clickable ? "cursor-pointer" : "cursor-wait"} border-b border-r border-gray-300 bg-white text-left text-[13px] text-gray-500 hover:bg-gray-50 pr-5 items-center`}
          onClick={handleAddRecord}
        >
          <NewRecordButton />
          {(isRecordsFetching || isRecordsLoading) && (
            <>
              <div className="loader-records ml-auto flex items-center"></div>
            </>
          )}
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
          <div className="flex h-[34px] flex-grow self-end border-t border-gray-300 bg-white"></div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="flex h-8 w-full border-b border-gray-300 bg-white">
          <NewFieldDialog handleClick={handleAddField} />
        </div>
        <div className="flex h-[34px] border-t border-gray-300 bg-white absolute bottom-0"></div>
      </div>
    </div>
  );
};

export default TanstackTable;
