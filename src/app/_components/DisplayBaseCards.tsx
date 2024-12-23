import { Base } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import BaseCard from "./BaseCard";

const DisplayBaseCards = () => {
  const [bases, setBases] = useState<Base[]>([]);
  const getBasesMutation = api.base.getBases.useMutation();

  useEffect(() => {

    const getBases = async () => {
      const bases = await getBasesMutation.mutateAsync();
      setBases(bases);
    }

    getBases();
  }, [])

  return <>
    {bases.map((base, index) => {
      return <BaseCard key={index} name={base.name} baseId={base.id}/>
    })} 
  </>
};

export default DisplayBaseCards;
