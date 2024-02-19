import { Dashboard } from "@/components/dashboard";
import Feed from "@/components/feed";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const FeedPage = async () => {
  const session = await getServerAuthSession();

  if (!session) return null;

  return <Dashboard main={<Feed />} aside={<p>aside</p>} />;
};

export default FeedPage;
