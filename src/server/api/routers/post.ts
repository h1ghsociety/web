import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { newPostFormSchema, type Post } from "@/interface/Post";
import { uploadFilesToStorage } from "@/lib/uploadFilesToStorage";
import { Timestamp } from "firebase-admin/firestore";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newPostFormSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error("Unauthorized");

      const album_url = await uploadFilesToStorage(
        input.album_url,
        ctx.session.user.id,
      );

      const normalizedInput = {
        ...input,
        album_url,
        author: {
          uid: ctx.session.user.id,
          displayName: ctx.session.user.name,
          avatarUrl: ctx.session.user.image,
        },
        createdAt: Timestamp.now(),
      };

      return ctx.db
        .collection("posts")
        .add({
          ...input,
          album_url,
          createdAt: new Date(Date.now()).toUTCString(),
        })
        .then((doc) => ({ uid: doc.id, ...normalizedInput }));
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
