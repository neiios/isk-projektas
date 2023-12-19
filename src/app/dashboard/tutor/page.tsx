import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Image from "next/image";
import { getInitials } from "~/utils/helpers";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { reservations } from "~/server/db/schema";
import { ApproveReservationButton } from "~/app/_components/approve-reservation-button";
import { CompleteReservationButton } from "~/app/_components/complete-reservation-button";
import CancelReservationButton from "~/app/_components/cancel-reservation-button";

export default async function Page() {
  const session = await getServerAuthSession();
  const user = await api.users.getUserInfo.query();
  if (!user) {
    redirect("/404");
  }

  async function approveReservation(reservationId: number) {
    "use server";

    if (!session) {
      redirect("/404");
    }

    await db
      .update(reservations)
      .set({
        approved: 1,
      })
      .where(
        and(
          eq(reservations.id, reservationId),
          eq(reservations.tutorId, session.user.id),
        ),
      );

    revalidatePath("/dashboard/tutor");
    redirect("/dashboard/tutor");
  }

  async function handleReservationCancel(reservationId: number) {
    "use server";
    await db.delete(reservations).where(eq(reservations.id, reservationId));
    revalidatePath("/dashboard/student");
    redirect("/dashboard/student");
  }

  async function completeReservation(reservationId: number) {
    "use server";

    if (!session) {
      redirect("/404");
    }

    await db
      .update(reservations)
      .set({
        completed: 1,
      })
      .where(
        and(
          eq(reservations.approved, 1),
          eq(reservations.id, reservationId),
          eq(reservations.tutorId, session.user.id),
        ),
      );

    revalidatePath("/dashboard/tutor");
    redirect("/dashboard/tutor");
  }

  const reservationsData = await api.reservations.getTutorReservations.query();

  return (
    <>
      <h1 className="mb-12 text-5xl font-extrabold">Sveiki, {user.name}!</h1>
      {reservationsData.length === 0 ? (
        <h2 className="mb-8 text-3xl">
          Kol kas nėra rezervacijų. Pasitikrinkite vėliau!
        </h2>
      ) : (
        <>
          <h2 className="mb-8 text-3xl">
            Jūs turite naują rezervaciją!
          </h2>
          {reservationsData.map((reservation) => (
            <div
              className="flex flex-col gap-8 border border-black p-16 shadow-sharp"
              key={reservation.id}
            >
              <div className="flex items-center justify-center gap-4">
                {reservation.student.image ? (
                  <Image
                    src={reservation.student.image}
                    alt={`${reservation.student.name} Profilio Nuotrauka`}
                    width={64}
                    height={64}
                    className="rounded-full"
                  ></Image>
                ) : (
                  <div className="relative inline-flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border border-black">
                    <span className="font-medium">
                      {getInitials(reservation.student.name)}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl">{reservation.student.name}</h3>
              </div>

              <ul className="list-disc">
                <li>El. paštas: {reservation.student.email}</li>
                <li>Telefono numeris: {reservation.student.phoneNumber}</li>
                <li>Pažymių vidurkis: {reservation.student.averageGrade}</li>
                <li>Mokosi {reservation.student.studyYear} klasėje</li>
                <li>
                  Rezervacija yra patvirtinta:{" "}
                  {reservation.approved === 1 ? "Taip" : "Ne"}
                </li>
              </ul>

              <div className="flex gap-4">
                {reservation.approved === 0 ? (
                  <ApproveReservationButton
                    approveReservation={approveReservation}
                    reservationId={reservation.id}
                  />
                ) : null}

                {reservation.approved === 1 ? (
                  <CompleteReservationButton
                    completeReservation={completeReservation}
                    reservationId={reservation.id}
                  />
                ) : null}

                <CancelReservationButton
                  handleCancel={handleReservationCancel}
                  reservationId={reservation.id}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
