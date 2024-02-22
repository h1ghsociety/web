"use client";

import { api } from "@/trpc/react";
import { PostCard } from "./PostCard";

const Feed = () => {
  const { data: posts, isLoading, error } = api.post.getLatest.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full">
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
    </div>
  );
};

export default Feed;
