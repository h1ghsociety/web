"use client";

import { cn } from "@/lib/utils";
import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AuthButton } from "./auth-button";
import { navigation } from "@/lib/navigation";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const SidebarDesktop = ({ session }: { session: Session }) => {
  const router = useRouter();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-muted/20 bg-background/20 px-6">
        <div className="flex h-16 shrink-0 items-center">
          <img className="h-8 w-auto" src="/Logo.svg" alt="Your Company" />
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Button
                      onClick={() => router.push(item.href)}
                      variant="sidebar"
                      className={cn(
                        item.current
                          ? "bg-background text-foreground"
                          : "text-foreground/60",
                        "group flex w-full justify-start gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      )}
                    >
                      <item.icon
                        className={cn(
                          item.current
                            ? "text-accent"
                            : "text-accent/60 group-hover:text-accent",
                          "h-5 w-5 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-auto">
              <AuthButton session={session} />
            </li>

            <li className="-mx-6">
              <Link
                href="/settings"
                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-background"
              >
                <Image
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src={session.user?.image ?? ""}
                  width={32}
                  height={32}
                  alt={session.user?.name ?? ""}
                />
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">{session.user?.name}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
