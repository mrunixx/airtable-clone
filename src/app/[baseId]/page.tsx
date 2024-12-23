"use client";

import { Base } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import BaseNavBar from "../_components/BaseNavBar";
import BaseToolBar from "../_components/BaseToolBar";

const BasePage = () => {
  const baseId = usePathname();
  const [loading, setLoading] = useState(true);
  const [base, setBase] = useState<Base | null>(null);
  const getBaseMutation = api.base.getBase.useMutation();
  useEffect(() => {
    setLoading(true);
    const getBase = async () => {
      const base = await getBaseMutation.mutateAsync({ id: baseId.slice(1) });
      setBase(base);
      setLoading(false);
    };

    void getBase();
  }, [baseId]);

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="w-full min-h-screen">
          <BaseNavBar baseName={base?.name}/>
          <BaseToolBar />
        </div>
      )}
    </>
  );
};

export default BasePage;
