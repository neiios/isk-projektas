import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="flex flex-col justify-between px-12 py-6 md:flex-row">
      { <Link href="/">
        <Image
        src= "/grades.png" 
        width={70}
        height={50}
        alt="Fancy Logo"
      />
      </Link> }
      {/* TODO: make a fancier menu on mobile */}
      <div className="flex flex-col md:flex-row md:gap-8 pt-2 pb-2">
        {session ? (
          <>
            <Link href="/dashboard">Pagr. puslapis</Link>
            <Link href="/profile">Profilis</Link>
            <Link href="/api/auth/signout">Atsijungti</Link>
          </>
        ) : (
          <Link
            href="/api/auth/signin"
            className="border border-black px-8 py-4 font-bold shadow-sharp bg-white"
          >
            Prisijungti
          </Link>
        )}
      </div>
    </header>
  );
}
