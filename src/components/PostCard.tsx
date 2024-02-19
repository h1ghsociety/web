"use client";

import React from "react";
import { type Post } from "@/interface/Post";
import { format } from "date-fns";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

export const PostCard = ({ post }: { post: Post }) => {
  console.log("POST CARD", post);

  return (
    <Card className="h-96 space-y-8 rounded-lg bg-white shadow-lg">
      <CardHeader>
        <p className="text-xl font-semibold">{post.title}</p>
      </CardHeader>

      <CardContent>
        <div className="flex space-x-4">
          {post.album_url.map((url) => (
            <Image
              key={url}
              src={url}
              width={112}
              height={112}
              className="h-28 w-28 rounded-lg object-cover"
              alt={post.title}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center space-x-4">
          <Image
            src={post.author.avatarUrl}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
            alt={post.author.displayName}
          />

          <div>
            <p className="text-md font-semibold">{post.author.displayName}</p>

            <p className="text-sm text-muted">
              {format(post.createdAt.toDate(), "PPP")}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
