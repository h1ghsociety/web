"use client";

import { protectedNavigation } from "@/lib/navigation";
import { type Session } from "next-auth";
import React from "react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarMobile } from "./sidebar-mobile";

export const ProtectedSidebar = ({ session }: { session: Session | null }) => {
  return (
    <>
      <SidebarMobile session={session} navigation={protectedNavigation} />

      <SidebarDesktop session={session} />
    </>
  );
};
