import { Dashboard } from "@/components/dashboard";
import { NewPostForm } from "@/components/new-post";
import React from "react";

const NewPostPage = () => {
  return <Dashboard main={<NewPostForm />} aside={<div></div>} />;
};

export default NewPostPage;
