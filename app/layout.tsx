import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Navigation from "@/components/navigation/Navigation";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-store",
  description: "Auction house store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <Navigation />
        {children}
        <Toaster position="top-center" closeButton />
      </body>
    </html>
  );
}
