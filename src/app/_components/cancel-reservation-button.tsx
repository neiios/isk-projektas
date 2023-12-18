"use client";

type HandleCancel = (tutorId: number) => Promise<void>;

export default function CancelReservationButton({
  handleCancel,
  reservationId,
}: {
  handleCancel: HandleCancel;
  reservationId: number;
}) {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await handleCancel(reservationId);
      }}
      className="border border-black px-16 py-4 font-bold shadow-sharp"
    >
      Atšaukti
    </button>
  );
}
