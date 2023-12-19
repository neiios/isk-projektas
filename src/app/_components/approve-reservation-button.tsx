"use client";

export function ApproveReservationButton({
  approveReservation,
  reservationId,
}: {
  approveReservation: (tutorId: number) => Promise<void>;
  reservationId: number;
}) {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await approveReservation(reservationId);
      }}
      className="border border-black bg-white p-4 font-bold shadow-sharp"
    >
      Patvirtinti Rezervacija
    </button>
  );
}
