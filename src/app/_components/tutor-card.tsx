"use client";

type HandleFastReservation = (tutorId: string) => Promise<void>;

export default function TutorCard({
  handleFastReservation,
  tutorId,
}: {
  handleFastReservation: HandleFastReservation;
  tutorId: string;
}) {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await handleFastReservation(tutorId);
      }}
      className="border border-black px-16 py-4 font-bold shadow-sharp bg-white"
    >
      Rezervuoti
    </button>
  );
}
