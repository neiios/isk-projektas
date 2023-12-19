import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/header";
import Footer from "./_components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Korepetitorių platforma",
  description: "Lorem ipsum",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} flex min-h-screen flex-col justify-between`}
        style={{ backgroundColor: '#efeadf' }}  // Added global background color
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <Header></Header>
          <main className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4">
            {children}
          </main>
          <Footer></Footer>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
