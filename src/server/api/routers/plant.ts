import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PlantDTO } from "@/interface/Plants";
const schema = z.object({
  uid: z.string().optional(),
  userId: z.string().min(1),
  strain: z.string().min(1),
  album_url: z.string().array().min(1),
  seed_type: z.string().min(1),
  cycle: z.string().min(1),
});
type PlantType = z.infer<typeof schema>;
export const plantRouter = createTRPCRouter({
  create: protectedProcedure.input(schema).mutation(async ({ ctx, input }) => {
    return ctx.db.collection("plants").add({
      ...input,
      createdAt: new Date(Date.now()).toUTCString(),
    });
  }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .collection("plants")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as PlantType),
      );
  }),
});
