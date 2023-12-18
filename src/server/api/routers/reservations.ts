import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { reservations } from "~/server/db/schema";
import { z } from "zod";

export const reservationsRouter = createTRPCRouter({
  addReservation: protectedProcedure
    .input(
      z.object({
        tutorId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await ctx.db.insert(reservations).values({
        studentId: ctx.session.user.id,
        tutorId: input.tutorId,
        approved: 0,
        completed: 0,
      });
    }),

  getStudentReservations: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.reservations.findMany({
      where: eq(reservations.studentId, ctx.session.user.id),
    });
  }),

  getTutorReservations: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.reservations.findMany({
      where: eq(reservations.tutorId, ctx.session.user.id),
      with: {
        student: true,
      },
    });
  }),
});
