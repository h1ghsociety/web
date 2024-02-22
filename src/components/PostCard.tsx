import React from "react";
import { type Post } from "@/interface/Post";
import { format } from "date-fns";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

export const PostCard = ({ post }: { post: Post }) => {
  console.log("POST CARD", post);

  // Gambiarra para contornar o erro de tipo do timestamp COISA DE MALUCO ISSO AQUI
  const createdAt = post.createdAt as unknown as {
    _seconds: number;
    _nanoseconds: number;
  };

  return (
    <Card
      key={post.uid}
      className="mx-auto aspect-[2/3] h-max w-full max-w-4xl cursor-pointer rounded-lg bg-black/15 bg-blend-overlay shadow-lg"
      style={{
        backgroundImage: `url(${post.album_url[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: 3 / 2,
      }}
    >
      <CardHeader className="rounded-t-lg bg-black/15">
        <p className="text-xl font-semibold text-white">{post.title}</p>
        <p className="text-white">{post.content}</p>
      </CardHeader>

      <CardContent className="min-h-[500px] bg-black/15"></CardContent>

      <CardFooter className="rounded-b-lg bg-opacity-75 bg-gradient-to-b from-black/15 to-black/75 pt-6">
        <div className="flex items-center space-x-4">
          <Image
            src={post.author.avatarUrl}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
            alt={post.author.displayName}
          />

          <div>
            <p className="text-md font-semibold text-white">
              {post.author.displayName}
            </p>

            <p className="text-sm text-white">
              {format(new Date(createdAt._seconds * 1000), "HH:mm - PPP")}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
