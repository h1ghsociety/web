import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { CreatePost } from "./create-post";

export default async function Feed() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPosts = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPosts.length > 0 ? (
        <>
          Your most recent post:{" "}
          {latestPosts.map((p) => (
            <p key={p.uid}>{p.title}</p>
          ))}
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
