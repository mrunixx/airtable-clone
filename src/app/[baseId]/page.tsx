"use client";

import { Base } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

const BasePage = () => {
  const baseId = usePathname();
  const [base, setBase] = useState<Base | null>(null);
  const getBaseMutation = api.base.get.useMutation();
  useEffect(() => {
    const getBase = async () => {
      const base = await getBaseMutation.mutateAsync({ id: baseId.slice(1) });
      setBase(base);
    }

    getBase()
  }, [baseId])

  return <>
    <p>base name: {base?.name}</p> 
    <p>base id: {base?.id}</p> 
    <p>base created at: {base?.createdAt.toDateString()}</p> 
    <p>base created by: {base?.createdById}</p> 
    <p>base starred: {base?.starred}</p> 
  </>;
};

export default BasePage;
