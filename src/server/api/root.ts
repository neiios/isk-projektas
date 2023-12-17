import { createTRPCRouter } from "~/server/api/trpc";
import { subjectsRouter } from "~/server/api/routers/subjects";
import { usersRouter } from "~/server/api/routers/users";
import { reservationsRouter } from "~/server/api/routers/reservations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  subjects: subjectsRouter,
  users: usersRouter,
  reservations: reservationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
