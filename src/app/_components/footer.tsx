import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 flex flex-col items-center justify-center gap-4 py-8">
      <div className="flex gap-8">
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
      <p>&copy; {currentYear} ISK Korepetitorių Platforma</p>
    </footer>
  );
}
