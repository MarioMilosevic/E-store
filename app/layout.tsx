import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Navigation from "@/components/navigation/Navigation";
import { Toaster } from "sonner";
import ClientProvider from "@/components/provider/ClientProvider";
import "./globals.css";
import { getUser } from "@/lib/utils/getUser";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <ClientProvider user={user} />
        <Navigation />
        {children}
        <Toaster position="top-center" closeButton />
      </body>
    </html>
  );
}
