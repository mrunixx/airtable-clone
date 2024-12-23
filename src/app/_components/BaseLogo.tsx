type Props = {
  children: React.ReactNode;
};

const BaseLogo = ({ children }: Props) => {
  return (
    <div className="h-[92px] w-[92px] flex items-center justify-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600 text-white text-2xl">
        {children}
      </div>
    </div>
  );
};

export default BaseLogo;
