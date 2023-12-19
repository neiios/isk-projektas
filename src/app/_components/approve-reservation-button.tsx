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
      className="border border-black p-4 font-bold shadow-sharp bg-white"
    >
      Patvirtinti Rezervacija
    </button>
  );
}
