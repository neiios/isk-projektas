import Link from "next/link";

export default async function ChildSetupPage() {
  return (
    <div className="flex max-w-xl flex-col items-center gap-24 border border-black p-8 shadow-sharp md:p-16">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Paprašyk tėvų, kad sukurtų tau paskyrą
        </h1>
        <p>
          Esi per jaunas susikurti asmeninę paskyrą šioje platformoje. Jeigu
          nori rasti korepetitorių, paprašyk tėvų (arba globėjų), kad jie tai
          padarytų už Tave.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="border border-black px-16 py-8 font-bold shadow-sharp"
      >
        Go Back
      </Link>
    </div>
  );
}
