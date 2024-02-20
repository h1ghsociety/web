import { Hero } from "@/components/hero";
import { PublicHeader } from "@/components/public-header";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user) redirect("/feed");

  return (
    <div>
      <PublicHeader session={session} />

      <Hero />
    </div>
  );
}
