"use client";

import { protectedNavigation, publicNavigation } from "@/lib/navigation";
import React from "react";
import { NavbarDesktop } from "./navbar-desktop";
import { SidebarMobile } from "./sidebar-mobile";
import { type Session } from "next-auth";

export const PublicHeader = ({ session }: { session: Session | null }) => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <NavbarDesktop />

      <SidebarMobile
        session={session}
        navigation={session ? protectedNavigation : publicNavigation}
      />
    </header>
  );
};
