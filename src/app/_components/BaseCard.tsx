import BaseLogo from "./BaseLogo";
import { redirect } from "next/navigation";

type Props = {
  name: string;
  baseId: string;
};

const BaseCard = ({ name, baseId }: Props) => {
  const handleClick = () => {
    redirect(`/${baseId}`);
  }
  return (
    <div
      role="button"
      className="flex h-[95px] min-w-[250px] max-w-[400px] flex-1 rounded-lg bg-white shadow-elevation-low hover:shadow-elevation-medium items-center card"
      onClick={handleClick}
    >
      <BaseLogo>{name.slice(0, 2)}</BaseLogo>
      <div className="flex flex-col gap-2 justify-center">
        <p className="text-sm">{name}</p>
        <p className="text-xs font-extralight">Base</p>
      </div>
    </div>
  );
};

export default BaseCard;
