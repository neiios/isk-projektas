import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 flex flex-col items-center justify-center gap-4 py-8">
      <div className="flex gap-8">
        <a href="/about">Apie mus</a>
        <a href="/contact">Kontaktai</a>
        <a href="/privacy">Privatumo politika</a>
      </div>
      <p>&copy; {currentYear} ISK Korepetitorių Platforma</p>
    </footer>
  );
}
