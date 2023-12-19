"use client";

export function GenericButton({
  clickHandler,
  innerText,
}: {
  clickHandler: () => Promise<void>;
  innerText: string;
}) {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await clickHandler();
      }}
      className="border border-black bg-white px-8 py-4 font-bold shadow-sharp"
    >
      {innerText}
    </button>
  );
}
