import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Timestamp } from "firebase-admin/firestore";
import { plantSchema, type Plant } from "@/interface/Plant";

export const plantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(plantSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error("Unauthorized");

      console.log("CREATE PLANT", input);

      const normalizedInput = {
        ...input,
        author: {
          uid: ctx.session.user.id,
          displayName: ctx.session.user.name,
          avatarUrl: ctx.session.user.image,
        },
        createdAt: Timestamp.now(),
      };

      return await ctx.db
        .collection("plants")
        .doc(input.uid)
        .set(normalizedInput);
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
