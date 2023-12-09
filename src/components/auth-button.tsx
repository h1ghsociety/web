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
      variant="ghost"
      className={cn(
        "group flex w-full justify-start gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:text-destructive",
      )}
    >
      <LogOutIcon
        className={cn(
          "h-6 w-6 shrink-0 text-gray-400 group-hover:text-destructive",
        )}
      />
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
};
