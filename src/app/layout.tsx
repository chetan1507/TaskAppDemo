
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from './components/session-provider';
import { getServerSession } from "next-auth";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <SessionProvider
          session={session}
          basePath="/api/auth"
          baseUrl={process.env.NEXTAUTH_URL}
        >{children}</SessionProvider>
      </body>
    </html>
  );
}