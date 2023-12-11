import Cycles from "@/components/cycles";
import { Dashboard } from "@/components/dashboard";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) redirect("/login");

  return (
    <Dashboard>
      <Cycles />
    </Dashboard>
  );
};

export default page;
