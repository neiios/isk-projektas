import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { userSubjects, subjects } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const subjectsRouter = createTRPCRouter({
  getSubjects: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.subjects.findMany();
  }),
  getUserSubjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(userSubjects)
      .where(eq(userSubjects.userId, ctx.session.user.id))
      .leftJoin(subjects, eq(userSubjects.subjectId, subjects.id));
  }),
});
