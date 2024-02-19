import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { db } from "./db";
import { updateCustomToken } from "./utils";
import admin from "firebase-admin";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
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

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      let customToken = "";

      if (user.id) {
        customToken = await admin.auth().createCustomToken(user.id);

        await updateCustomToken(user.id, customToken, db);

        const ref = db.collection("accounts").where("userId", "==", user.id);

        const snap = await ref.get();

        const account = snap.docs[0]?.data() as {
          id_token: string;
        };

        if (!account) {
          return {
            ...session,
            user: {
              ...session.user,
              id: user.id,
            },
          };
        }

        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            id_token: account.id_token,
          },
        };
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          token: customToken,
        },
      };
    },
  },
  adapter: FirestoreAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id as string,
          name: profile.name || (profile.login as string),
          email: profile.email as string,
          image: profile.picture as string,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Google provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
