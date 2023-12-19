import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <div className="flex max-w-5xl flex-col gap-12 md:min-h-[30rem] md:flex-row">
        <div className="flex flex-col items-center justify-around">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-extrabold">
            Šiuolaikiški korepetitoriai. Gerėjantys rezultatai. <br/> Išlaikyti kontroliniai.
            </h1>
            <h2 className="text-xl">
              &#10003;
             Susirask korepetitorių per dieną <br/>
             &#10003;
             Išsirink sau tinkamiausią korepetitorių <br/>
             &#10003;
             Lankstus grafikų pasirinkimas <br/>
             &#10003;
             Skaityk kitų mokinių atsiliepimus <br/>
            </h2>
          </div>

          <Link
            href={session ? "/dashboard" : "/api/auth/signin"}
            className="border border-black px-16 py-6 font-bold shadow-sharp bg-white"
          >
            {session ? "Eiti į pagrindinį puslapį" : "Prisijunk prie mūsų!"}
          </Link>
        </div>
        <div>
          <Image
             src= "/teacher.png" 
            width={700}
            height={700}
            alt="God's fanciest tutor"
          />
        </div>
      </div>
    </>
  );
}
