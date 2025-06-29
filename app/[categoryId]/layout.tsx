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
    <main className="max-w-[1280px] py-12 relative border border-black grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 pb-12 mx-auto">
      {children}
    </main>
  );
}
