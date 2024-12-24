import { api } from "~/trpc/react";
import BaseCard from "./BaseCard";
import Loading from "./Loading";

const DisplayBaseCards = () => {
  const { data: bases, isLoading: isLoading, error: basesError } = api.base.getBases.useQuery();

  if (isLoading) {
    return <Loading />
  }

  if (basesError || !bases) {
    return <></>
  }

  return (
    <>
      {bases.map((base, index) => {
        return <BaseCard key={index} name={base.name} baseId={base.id} />;
      })}
    </>
  );
};

export default DisplayBaseCards;
