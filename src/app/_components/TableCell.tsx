import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "~/trpc/react";

type Props = {
  setTableRecords: Dispatch<
    SetStateAction<
      {
        fieldId: string;
        recordId: string;
        data: string;
        id: string;
      }[]
    >
  >;
  fieldId: string;
  recordId?: string | undefined;
  data?: string | undefined;
  rowIndex?: string | undefined;
};

const TableCell = ({
  setTableRecords,
  fieldId,
  recordId,
  data,
  rowIndex,
}: Props) => {
  const [input, setInput] = useState(data ?? "");
  const [initialInput, setInitialInput] = useState(data ?? "");
  const [isEditable, setIsEditable] = useState(false);

  const cellMutation = api.table.updateCellValue.useMutation();

  const handleDbSave = async () => {
    if (input !== initialInput) {
      setTableRecords((prev) =>
        prev.map((rV) =>
          rV.fieldId === fieldId && rV.recordId === recordId
            ? { ...rV, data: input }
            : rV,
        ),
      );

      setInitialInput(input);
      if (recordId) {
        const saveToDb = async (attempt = 1) => {
          try {
            await cellMutation.mutateAsync({
              data: input,
              fieldId: fieldId,
              recordId: recordId,
            });
            console.log("Input saved at: ", fieldId, recordId);
          } catch {
            if (attempt < 3) {
              setTimeout(() => void saveToDb(attempt + 1), 3000); 
            } else {
              console.error("Failed to save input after 3 attempts.");
            }
          }
        };
  
        await saveToDb();
      }
    }
    setIsEditable(false);
  };

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") {
      setIsEditable(true);
    }
  };

  useEffect(() => {
    setInitialInput(data ?? "");
    setInput(data ?? "");
  }, [data])

  return (
    <div
      className="h-[31px] w-[176px] border-r border-gray-300 bg-transparent text-[13px]"
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleEnter}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleDbSave}
        className="h-[31px] w-full cursor-default bg-transparent p-1.5 focus:bg-white"
        readOnly={!isEditable}
      />
    </div>
  );
};

export default TableCell;
