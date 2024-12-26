
type Props = {
  children: React.ReactNode;
}

const TableRow = ({ children } : Props) => {
  
  return <div className="flex h-8 border-b bg-white border-gray-300 hover:bg-[#f4f4f4] focus-within:bg-[#f4f4f4] ">{children}</div>
}

export default TableRow;