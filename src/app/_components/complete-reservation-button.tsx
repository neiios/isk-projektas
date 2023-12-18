"use client";

export function CompleteReservationButton({
  completeReservation,
  reservationId,
}: {
  completeReservation: (tutorId: number) => Promise<void>;
  reservationId: number;
}) {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await completeReservation(reservationId);
      }}
      className="border border-black p-4 font-bold shadow-sharp"
    >
      Complete Reservation
    </button>
  );
}
