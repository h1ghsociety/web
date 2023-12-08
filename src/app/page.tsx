/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dashboard } from "@/components/dashboard";
import Feed from "@/components/feed";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <Dashboard session={session}>
      <Feed />
    </Dashboard>
  );
}
