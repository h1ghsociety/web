import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { format } from "date-fns";

export default async function Feed() {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  const latestPosts = await api.post.getLatest.query();

  return (
    <div className="w-full">
      {latestPosts.length > 0 ? (
        <>
          <ul role="list" className="space-y-3">
            {latestPosts.map((post) => (
              <li
                key={post.uid}
                className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6"
              >
                <h3 className="text-lg font-semibold">{post.title}</h3>

                <p className="text-gray-500">
                  {format(post.createdAt.toDate(), "PPP")}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
