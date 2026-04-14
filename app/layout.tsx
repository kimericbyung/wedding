import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brittaney & Eric | September 19, 2026",
  description: "Join us to celebrate our wedding day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-parchment text-ink">
        <Nav />
        <main className="flex-1 pt-16 relative z-10">{children}</main>
      </body>
    </html>
  );
}
