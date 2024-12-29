type Props = {
  children: React.ReactNode;
  selected?: boolean;
  onClick: () => void
};

const NavigateTableBtn = ({ children, selected, onClick }: Props) => {
  return (
    <>
      <div
        className={`flex h-full min-w-[80px] cursor-pointer items-center justify-center gap-1 px-3 ${selected ? "rounded-t-sm bg-white text-black" : "text-white hover:bg-[#6b1d30]"}`}
        onClick={onClick}
      >
        {children}
        {selected && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="icon flex-none"
          >
            <use
              fill="currentColor"
              href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
            ></use>
          </svg>
        )}
      </div>
      {!selected && <div className="h-[12px] border-l opacity-20"></div>}
    </>
  );
};

export default NavigateTableBtn;
