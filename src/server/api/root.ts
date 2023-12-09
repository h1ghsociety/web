import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { cycleRouter } from "./routers/cycle";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  cycle: cycleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
