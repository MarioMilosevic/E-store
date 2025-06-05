import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "E-store",
  description: "Auction house store",
};

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-[1280px] mx-auto py-12 relative">{children}</main>
  );
}
