import { AuthButton } from "@/components/auth-button";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user) redirect("/feed");

  return (
    <div>
      <h1>Home page</h1>

      <AuthButton session={session} />
    </div>
  );
}
