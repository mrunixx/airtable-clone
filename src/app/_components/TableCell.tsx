import { useState } from "react";
import { api } from "~/trpc/react";

type Props = {
  fieldId: string;
  recordId?: string | undefined;
  data?: string | undefined;
  rowIndex?: string | undefined;
};

const TableCell = ({ fieldId, recordId, data, rowIndex }: Props) => {
  const [input, setInput] = useState(data ?? "");
  const [initialInput, setInitialInput] = useState(data ?? "");
  const [isEditable, setIsEditable] = useState(false);

  const cellMutation = api.table.updateCellValue.useMutation();

  const handleDbSave = () => {
    if (input !== initialInput) {
      setInitialInput(input);
      if (recordId) {
        void cellMutation.mutateAsync({ data: input, fieldId: fieldId, recordId: recordId })
      }
      console.log("input saved at: ", fieldId, recordId);
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
  }

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
        className="h-[31px] w-full cursor-default bg-transparent focus:bg-white p-1.5"
        readOnly={!isEditable}
      />
    </div>
  );
};

export default TableCell;
