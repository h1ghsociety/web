import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Timestamp } from "firebase-admin/firestore";
import { plantFormSchema, type Plant } from "@/interface/Plant";

export const plantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(plantFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.collection("plants").add({
        ...input,
        author: {
          uid: ctx.session?.user.id,
          displayName: ctx.session?.user.name,
          avatarUrl: ctx.session?.user.image,
        },
        createdAt: Timestamp.now(),
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .collection("plants")
      .orderBy("createdAt", "desc")
      .limit(5)
      .where("author.uid", "==", ctx.session?.user.id)
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as Plant),
      );
  }),
});
