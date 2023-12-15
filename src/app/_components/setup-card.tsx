import Link from "next/link";
import type { ReactElement } from "react";

interface SetupCardProps {
  title: string;
  href: string;
  icon: ReactElement;
}

export default function SetupCard({ icon, href, title }: SetupCardProps) {
  return (
    <Link
      href={href}
      className="flex h-64 w-64 flex-col items-center justify-center gap-4 border border-black p-8 shadow-[-5px_5px_0px_0px_#000]"
    >
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
    </Link>
  );
}
