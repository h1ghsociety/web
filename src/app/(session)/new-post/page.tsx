import { Dashboard } from "@/components/dashboard";
import { NewPostForm } from "@/components/new-post";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const NewPostPage = async () => {
  const session = await getServerAuthSession();

  if (!session) return null;

  return <Dashboard main={<NewPostForm />} aside={<div></div>} />;
};

export default NewPostPage;
