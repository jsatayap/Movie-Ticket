import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieTicket",
  description: "Movie theatre booking app",
};

export default function RootLayout({ 
  children,
 }: {
  children: React.ReactNode;
 }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
