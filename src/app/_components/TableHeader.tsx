type Props = {
  header: string;
  index: string;
};

const TableHeader = ({ header, index }: Props) => {
  return (
    <div className="flex w-full items-center gap-1 px-1">
      {index === "0" ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            name="select"
            id="select-all"
            className="mr-10"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="primaryDisplayTypeIcon flex-none"
          >
            <use
              fill="var(--palette-neutral-quiet)"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#TextAlt"
            ></use>
          </svg>
        </div>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="primaryDisplayTypeIcon flex-none"
        >
          <use
            fill="var(--palette-neutral-quiet)"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Paragraph"
          ></use>
        </svg>
      )}
      <p className={`text-sm font-light leading-4 ${index === "0" ? "mr-24" : ""}`}>{header}</p>
      <div className="ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="icon"
        >
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
          ></use>
        </svg>
      </div>
    </div>
  );
};

export default TableHeader;
