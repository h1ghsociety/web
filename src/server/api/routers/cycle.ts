import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { cycleFormSchema, type Cycle } from "@/interface/Cycle";
import { Timestamp } from "firebase-admin/firestore";

export const cycleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(cycleFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.collection("cycles").add({
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
      .collection("cycles")
      .orderBy("createdAt", "desc")
      .limit(3)
      .where("author.uid", "==", ctx.session?.user.id)
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as Cycle),
      );
  }),
});
