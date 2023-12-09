import { CreateCycle } from "@/components/create-cycle";
import Cycles from "@/components/cycles";
import { Dashboard } from "@/components/dashboard";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();

  return (
    <Dashboard session={session}>
      <Cycles />
    </Dashboard>
  );
};

export default page;
