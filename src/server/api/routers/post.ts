import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Timestamp } from "firebase-admin/firestore";
import { postSchema, type Post } from "@/interface/Post";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(postSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error("Unauthorized");

      const now = Timestamp.now();

      const normalizedInput = {
        ...input,
        author: {
          uid: ctx.session.user.id,
          displayName: ctx.session.user.name,
          avatarUrl: ctx.session.user.image,
        },
        createdAt: now,
      };

      return ctx.db
        .collection("posts")
        .add(normalizedInput)
        .then(() => ({ ...normalizedInput }));
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as Post),
      );
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
