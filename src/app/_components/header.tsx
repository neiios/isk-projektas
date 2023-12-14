import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="flex flex-col justify-between px-12 py-6 md:flex-row">
      <div>Fancy Logo</div>
      {/* TODO: make a fancier menu on mobile */}
      <div className="flex flex-col md:flex-row md:gap-8">
        <Link href="/">Landing Page</Link>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className=""
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/faq">FAQ</Link>
      </div>
    </header>
  );
}
