export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[800px] mx-auto border border-black">
      {children}
    </main>
  );
}
