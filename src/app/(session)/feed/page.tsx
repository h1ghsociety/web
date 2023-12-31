import { Dashboard } from "@/components/dashboard";
import Feed from "@/components/feed";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const FeedPage = async () => {
  const session = await getServerAuthSession();

  if (!session) redirect("/login");

  return (
    <Dashboard>
      <Feed />
    </Dashboard>
  );
};

export default FeedPage;
