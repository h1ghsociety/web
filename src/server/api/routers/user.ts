import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  UserLanguageSchema,
  UserThemeSchema,
  type User,
} from "@/interface/User";

export const userRouter = createTRPCRouter({
  getUserProfile: protectedProcedure
    .input(z.object({ uid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .collection("users")
        .doc(input.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return { uid: doc.id, ...doc.data() } as User;
          } else {
            return null;
          }
        });
    }),

  updateUserProfile: protectedProcedure
    .input(
      z.object({
        uid: z.string(),
        data: z.object({
          name: z.string().optional(),
          email: z.string().optional(),
          username: z.string().optional(),
          bio: z.string().optional(),
          dob: z.date().optional(),
          language: UserLanguageSchema.optional(),
          theme: UserThemeSchema.optional(),
          urls: z.array(z.object({ value: z.string() })).optional(),
        }),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .collection("users")
        .doc(input.uid)
        .update({
          ...input.data,
          updatedAt: new Date(Date.now()).toUTCString(),
        });
    }),
});
