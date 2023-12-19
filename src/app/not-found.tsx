import Image from "next/image";

export default async function Page() {
  return (
    <>
      <h1 className="mb-8 text-5xl font-extrabold">Įvyko klaida!</h1>
      <h2 className="mb-20 text-3xl font-bold">
        Pabandykite pereiti į pagrindį puslapį.
      </h2>
      <Image
        src="https://cataas.com/cat/says/Taip, aš irgi korepetitorius"
        width={500}
        height={500}
        alt="God's fanciest tutor"
      />
    </>
  );
}
