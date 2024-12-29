import { Table } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import NavigateTableBtn from "./NavigateTableBtn";
import { api } from "~/trpc/react";

type Props = {
  tables: Table[];
  setLocalTables: Dispatch<SetStateAction<Table[] | undefined>>;
  baseId: string;
  currentTable: string;
  setCurrentTable: Dispatch<SetStateAction<string | undefined>>;
};

const BaseToolBar = ({
  tables,
  setLocalTables,
  currentTable,
  setCurrentTable,
  baseId,
}: Props) => {
  const createTableMutation = api.table.createDefaultTable.useMutation();
  const handleTableSwitch = (id: string) => {
    setCurrentTable(id);
  };

  const handleTableAdd = async () => {
    const newTable = await createTableMutation.mutateAsync({
      name: `Table ${tables.length + 1}`,
      baseId: baseId,
    });
    setLocalTables((prev) => {
      if (prev) {
        const newTables = [...prev];
        newTables.push(newTable.table);
        return newTables;
      }
    });
  };

  return (
    <div className="flex h-9 w-full items-end justify-between gap-2 bg-red-dusty">
      <div className="left flex h-8 w-full items-center rounded-tr-lg bg-red-dusty-dark pl-3 text-sm">
        {tables.map((t, index) => {
          return t.id === currentTable ? (
            <NavigateTableBtn
              key={index}
              selected={true}
              onClick={() => handleTableSwitch(t.id)}
            >
              {t.name}
            </NavigateTableBtn>
          ) : (
            <NavigateTableBtn
              key={index}
              onClick={() => handleTableSwitch(t.id)}
            >
              {t.name}
            </NavigateTableBtn>
          );
        })}
        <div className="h-[12px] border-l opacity-20"></div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="parent-focus-visible-current-color w-10 flex-none cursor-pointer px-3 text-white"
        >
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
          ></use>
        </svg>
        <div className="h-[12px] border-l opacity-20"></div>
        <div
          tabIndex={0}
          role="button"
          id="id_f2a73c19b5b564fe350236e80483e8ea"
          aria-expanded="false"
          aria-haspopup="true"
          className="flex h-8 flex-none cursor-pointer items-center gap-1 rounded px-3 text-[13px] font-light text-white"
          aria-label="Add or import table"
          data-tutorial-selector-id="addTableButton"
          onClick={handleTableAdd}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="my-half flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Plus"
            ></use>
          </svg>
          <p className="font-family-default text-size-default line-height-3 font-weight-default ml1">
            Add or import
          </p>
        </div>
      </div>
      <div className="right flex h-8 gap-5 rounded-tl-lg bg-red-dusty-dark px-2 text-white">
        <button className="flex items-center px-1 text-sm font-light opacity-80 hover:opacity-100">
          Extensions
        </button>
        <button className="flex items-center gap-1 px-1 text-sm font-light opacity-80 hover:opacity-100">
          Tools
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="ml-half flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
            ></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BaseToolBar;
