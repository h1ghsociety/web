"use client";

import { type Session } from "next-auth";
import {
  SessionProvider as NextAuthProvider,
  type SessionProviderProps,
} from "next-auth/react";
import { createContext } from "react";

export const SessionCtx = createContext<Session | null>(null);

export const SessionProvider = ({
  children,
  session,
}: SessionProviderProps) => {
  return <NextAuthProvider session={session}>{children}</NextAuthProvider>;
};
