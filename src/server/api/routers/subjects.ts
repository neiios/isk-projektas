import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const subjectsRouter = createTRPCRouter({
  getSubjects: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.subjects.findMany();
  }),

  getUserSubjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.userSubjects.findMany({
      with: {
        subject: true,
      },
    });
  }),
});
