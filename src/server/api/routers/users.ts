import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  getUserInfo: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
    });
  }),

  getAvailableTutors: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({
      where: and(eq(users.accountType, "tutor"), eq(users.isAvailable, 1)),
      with: { languages: true, studyTypes: true, subjects: true },
    });
  }),
});
