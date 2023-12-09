"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { type Session } from "next-auth";

export const AuthButton = async ({ session }: { session: Session | null }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        router.push(session ? "/api/auth/signout" : "/api/auth/signin")
      }
    >
      {session ? "" : "Sign in"}
    </Button>
  );
};
