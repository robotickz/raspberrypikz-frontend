import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Raspberry Pi — одноплатные компьютеры",
    default: "Raspberry Pi — одноплатные компьютеры",
  },
  description:
    "Raspberry Pi — это одноплатный компьютер размером с кредитную карту.",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/favicon.png",
      href: "/favicon.png",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/favicon.png",
      href: "/favicon.png",
    },
  ],
  openGraph: {
    title: {
      template: "%s | Raspberry Pi KZ",
      default: "Raspberry Pi KZ",
    },
    description:
      "Raspberry Pi — это одноплатный компьютер размером с кредитную карту.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Header />
          <div className="flex flex-col items-center p-6  flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
