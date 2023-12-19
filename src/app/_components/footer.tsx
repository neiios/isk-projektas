import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 flex flex-col items-center justify-center gap-4 py-8">
      <div className="flex gap-8">
        <a href="/">Apie mus</a>
        <a href="/dashboard">Pagrindinis puslapis</a>
        <a href="/profile">Profilis</a>
      </div>
      <p>&copy; {currentYear} ISK Korepetitorių Platforma</p>
    </footer>
  );
}
