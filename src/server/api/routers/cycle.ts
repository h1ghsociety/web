import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type CycleDTO } from "@/interface/Cycle";

export const cycleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        cycleName: z.string().min(1),
        week: z.string().min(1),
        stage: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.collection("cycles").add({
        ...input,
        createdAt: new Date(Date.now()).toUTCString(),
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .collection("cycles")
      .orderBy("createdAt", "desc")
      .limit(3)
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as CycleDTO),
      );
  }),
});
