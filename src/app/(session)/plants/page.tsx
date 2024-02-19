import { CreatePlant } from "@/components/create-plant";
import { Dashboard } from "@/components/dashboard";
import Plants from "@/components/plants";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) return null;

  return <Dashboard main={<Plants />} aside={<CreatePlant />} />;
};

export default page;
