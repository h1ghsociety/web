"use client";

import { cn } from "@/lib/utils";
import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { protectedNavigation } from "@/lib/navigation";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

export const SidebarDesktop = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background/20 px-6">
        <div className="flex h-16 shrink-0 items-center">
          <Image
            className="h-8 w-auto"
            height={32}
            width={32}
            src="/Logo.svg"
            alt="Your Company"
          />
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-2">
                <li>
                  <Link
                    href="/new-post"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "group flex w-full justify-start gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6",
                    )}
                  >
                    <Plus
                      className={cn("h-4 w-4 shrink-0")}
                      aria-hidden="true"
                    />
                    New post
                  </Link>
                </li>

                <div className="pt-4 text-xs font-semibold leading-6 text-gray-400">
                  Main
                </div>

                {protectedNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathname === item.href
                          ? "bg-background text-foreground"
                          : "text-foreground/60",
                        "group flex w-full justify-start gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6",
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href
                            ? "text-foreground"
                            : "text-foreground/60 group-hover:text-foreground",
                          "h-4 w-4 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {session && (
              <li className="-mx-6 mt-auto">
                <Link
                  href="/settings"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-foreground hover:bg-background"
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
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
