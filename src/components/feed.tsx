import { api } from "@/trpc/server";
import { format } from "date-fns";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

export default async function Feed() {
  const posts = await api.post.getLatest.query();

  return (
    <div className="w-full">
      {posts.length > 0 ? (
        <>
          <ul role="list" className="space-y-3">
            {posts.map((post) => (
              <Card key={post.uid} className="space-y-8 rounded-lg shadow-lg">
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
                      <p className="text-md font-semibold">
                        {post.author.displayName}
                      </p>

                      <p className="text-sm text-muted">
                        {format(post.createdAt.toDate(), "PPP")}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </ul>
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
