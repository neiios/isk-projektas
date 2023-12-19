import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { userSubjects } from "~/server/db/schema";

export const subjectsRouter = createTRPCRouter({
  getSubjects: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.subjects.findMany();
  }),

  getUserSubjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.userSubjects.findMany({
      with: {
        subject: true,
      },
      where: eq(userSubjects.userId, ctx.session.user.id),
    });
  }),
});
