"use client";

type HandleReservationType = (tutorId: string) => Promise<void>;

export default function ReservationButton({
  handleReservation,
  tutorId,
}: {
  handleReservation: HandleReservationType;
  tutorId: string;
}) {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await handleReservation(tutorId);
      }}
      className="border border-black px-8 py-2 font-bold shadow-sharp"
    >
      Rezervuoti
    </button>
  );
}
