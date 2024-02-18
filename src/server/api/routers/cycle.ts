import { updateCycleFormSchema } from "./../../../interface/Cycle";
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

  addPlantToCycle: protectedProcedure
    .input(updateCycleFormSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.uid) throw new Error("uid is required");
      if (!input.plants) throw new Error("plants are required");

      return ctx.db.collection("cycles").doc(input.uid).set(
        {
          plants: input.plants,
        },
        {
          merge: true,
        },
      );
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
