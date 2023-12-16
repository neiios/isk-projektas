import "~/styles/globals.css";

import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/header";
import Footer from "./_components/footer";

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
      <body className="flex min-h-screen flex-col justify-between">
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
