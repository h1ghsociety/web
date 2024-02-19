import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Timestamp } from "firebase-admin/firestore";
import { plantSchema, type Plant } from "@/interface/Plant";

export const plantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(plantSchema.partial())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user || !input.uid) throw new Error("Unauthorized");

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

      console.log("NORMALIZED DATA", normalizedInput);

      return await ctx.db
        .collection("plants")
        .doc(input.uid)
        .set(normalizedInput);
    }),

  update: protectedProcedure
    .input(plantSchema.partial())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user || !input.uid) throw new Error("Unauthorized");

      const now = Timestamp.now();

      console.log("input", input);

      const normalizedInput = {
        ...input,
        author: {
          uid: ctx.session.user.id,
          displayName: ctx.session.user.name,
          avatarUrl: ctx.session.user.image,
        },
        updatedAt: now,
      };

      console.log("NORMALIZED DATA", normalizedInput);

      return await ctx.db
        .collection("plants")
        .doc(input.uid)
        .set(normalizedInput, { merge: true });
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
