type Props = {
  heading: string;
  children: React.ReactNode;
  info: string
};


const DashboardCard = ({ heading, children, info } : Props) => {
  return (
    <div role="button" className="flex-1 rounded-lg shadow-elevation-low hover:shadow-elevation-medium h-[95px] flex flex-col justify-center bg-white p-4">
      <div className="flex gap-2">
        {children}
        <p className="text-base">{heading}</p>
      </div>
      <p className="text-[0.82rem] font-extralight">{info}</p>
    </div>
  )    
}

export default DashboardCard;