"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { type Session } from "next-auth";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";

export const AuthButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        router.push(session ? "/api/auth/signout" : "/api/auth/signin")
      }
      variant="destructive"
      className={cn(
        "group flex w-full justify-start gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
      )}
    >
      <LogOutIcon className={cn("h-4 w-4 shrink-0")} />
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
};
