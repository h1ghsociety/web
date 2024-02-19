import { CreateCycle } from "@/components/create-cycle";
import Cycles from "@/components/cycles";
import { Dashboard } from "@/components/dashboard";
import { getServerAuthSession } from "@/server/auth";

import React from "react";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) return null;

  return <Dashboard main={<Cycles />} aside={<CreateCycle />} />;
};

export default page;
