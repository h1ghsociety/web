import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { CycleDTO } from "@/interface/Cycle";
import { Post } from "@/interface/Post";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.collection("posts").add({
        ...input,
        createdAt: new Date(Date.now()).toUTCString(),
      });
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
