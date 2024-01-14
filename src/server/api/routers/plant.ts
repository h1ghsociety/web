import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PlantDTO } from "@/interface/Plants";

export const plantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        strain: z.string().min(1),
        album_url: z.string().array().min(1),
        seed_type: z.string().min(1),
        cycle: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.collection("plants").add({
        ...input,
        createdAt: new Date(Date.now()).toUTCString(),
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .collection("plants")
      .orderBy("createdAt", "desc")
      .limit(3)
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as PlantDTO),
      );
  }),
});
