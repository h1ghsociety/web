import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { CreatePost } from "./create-post";

export default async function Feed() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPosts = await api.post.getLatest.query();

  return (
    <div className="w-full" justify-center>
      {latestPosts.length > 0 ? (
        <div className="justify-self-center">
          Your most recent post:{" "}
          {latestPosts.map((p) => (
            <p className="justify-self-center" key={p.uid}>
              {p.title}
            </p>
          ))}
        </div>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
