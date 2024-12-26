
type Props = {
  children?: React.ReactNode
}

const NewRecordButton = ({ children } : Props) => {
  return (
    <div className="flex items-center h-8 border-r border-gray-300 w-[242px]">
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
      <p className="text-red px-5">
      {children}
      </p>
    </div>
  );
};

export default NewRecordButton;
