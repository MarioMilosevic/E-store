export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[400px] mx-auto">
      {children}
    </main>
  );
}
