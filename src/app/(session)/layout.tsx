import { ProtectedSidebar } from "@/components/protected-sidebar";
import { SessionProvider } from "@/contexts/session-provider";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerAuthSession();

  if (!session) redirect("/");

  return (
    <SessionProvider>
      <ProtectedSidebar session={session} />

      {children}
    </SessionProvider>
  );
};

export default DashboardLayout;
