type Props = {
  heading: string;
  children: React.ReactNode;
  info: string
};


const DashboardCard = ({ heading, children, info } : Props) => {
  return (
    <div className="flex-1 rounded-lg border-[1px] hover:shadow-md h-[95px] flex flex-col justify-center bg-white p-4">
      <div className="flex gap-2">
        {children}
        <p className="text-base">{heading}</p>
      </div>
      <p className="text-[0.82rem] font-extralight">{info}</p>
    </div>
  )    
}

export default DashboardCard;