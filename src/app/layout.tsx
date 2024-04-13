"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Fragments/Navbar";
import { SessionProvider } from "next-auth/react";
import Background from "./components/Elements/Background";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <Navbar />
          <Background />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
