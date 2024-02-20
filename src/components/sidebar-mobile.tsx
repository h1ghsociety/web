"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { Button, buttonVariants } from "./ui/button";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AuthButton } from "./auth-button";
import { type Session } from "next-auth";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
  SheetFooter,
} from "./ui/sheet";
import { type LucideIcon } from "lucide-react";

export type NavigationLink = {
  name: string;
  href: string;
  icon: LucideIcon;
  current: boolean;
};

export const SidebarMobile = ({
  session,
  navigation,
}: {
  session: Session | null;
  navigation: NavigationLink[];
}) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <div className="flex h-16 shrink-0 flex-grow items-center">
        <Image
          className="h-8 w-auto"
          height={32}
          width={32}
          src="/Logo.svg"
          alt="Your Company"
        />
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="-m-2.5 p-2.5 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex h-full grow flex-col">
          <SheetHeader>
            <SheetTitle>
              <Image
                className="h-8 w-auto"
                height={32}
                width={32}
                src="/Logo.svg"
                alt="Your Company"
              />
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-4">
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: "sidebar" }),
                        pathname === item.href
                          ? "bg-background text-foreground"
                          : "text-foreground/60",
                        "group flex w-full justify-start gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6",
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href
                            ? "text-accent"
                            : "text-accent/60 group-hover:text-accent",
                          "h-4 w-4 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <SheetFooter className="mt-auto flex gap-4 px-0 sm:flex-col">
                <li>
                  <AuthButton session={session} />
                </li>

                {session && (
                  <Link
                    href="/settings"
                    className="flex w-full items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-foreground hover:bg-background"
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
                )}
              </SheetFooter>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
