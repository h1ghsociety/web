import { SidebarDesktop } from "@/components/sidebar-desktop";
import { SidebarMobile } from "@/components/sidebar-mobile";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerAuthSession();

  if (!session) return redirect("/");

  return (
    <>
      <SidebarMobile />
      <SidebarDesktop session={session} />
      {children}
    </>
  );
};

export default DashboardLayout;
