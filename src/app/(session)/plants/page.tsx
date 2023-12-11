import Cycles from "@/components/cycles";
import { Dashboard } from "@/components/dashboard";
import Plants from "@/components/plants";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) return null;

  return (
    <Dashboard>
      <Plants />
    </Dashboard>
  );
};

export default page;
