import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { db } from "./db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      customToken: string;
      id_token: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      return { ...session, user, token };
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
