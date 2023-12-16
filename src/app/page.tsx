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
            <h1 className="text-5xl font-extrabold">
              Lorem ipsum dolor sit amet.
            </h1>
            <h2 className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
              magni.
            </h2>
          </div>

          <Link
            href={session ? "/dashboard" : "/api/auth/signin"}
            className="border border-black p-8 font-bold shadow-sharp"
          >
            {session ? "Go to dashboard" : "Sign in"}
          </Link>
        </div>
        <div>
          <Image
            src="https://cataas.com/cat/says/Taip, aš irgi korepetitorius"
            width={500}
            height={500}
            alt="God's fanciest tutor"
          />
        </div>
      </div>
    </>
  );
}
