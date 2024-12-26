import { useState } from "react";

type Props = {
  fieldId: string;
  recordId?: string | undefined;
  data?: string | undefined;
};

const TableCell = ({ fieldId, recordId, data }: Props) => {
  const [input, setInput] = useState(data);
  const [initialInput, setInitialInput] = useState(data);
  const [isEditable, setIsEditable] = useState(false);

  const handleDbSave = () => {
    if (input !== initialInput) {
      setInitialInput(input);
      console.log("push to db");
    }
    setIsEditable(false);
  };

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  return (
    <div
      className="h-[31px] w-full border-r border-gray-300 bg-transparent text-[13px]"
      onDoubleClick={handleDoubleClick}
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
