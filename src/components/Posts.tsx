"use client";

import React from "react";
import { PostCard } from "./PostCard";
import { type Post } from "@/interface/Post";

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.length > 0 ? (
        <>
          <ul role="list" className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.uid} post={post} />
            ))}
          </ul>
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </>
  );
};

export default Posts;
