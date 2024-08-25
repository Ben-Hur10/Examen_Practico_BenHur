import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import GlowingBackground from "../components/background/GlowingBackground";
import { TokenProvider } from '../components/TokenContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PruebaTecnicaBenHur",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <GlowingBackground />
      <TokenProvider>
        <div className="relative z-10 h-screen">
          <Navbar />
          {children}
        </div>
        </TokenProvider>
      </body>
    </html>
  );
}