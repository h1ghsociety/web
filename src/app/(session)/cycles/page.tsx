import Cycles from "@/components/cycles";
import { Feed } from "@/components/feed";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) return null;

  return (
    <Feed>
      <Cycles />
    </Feed>
  );
};

export default page;
