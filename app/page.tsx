import Categories from "@/components/categories/Categories";

export default function Home() {
  return (
    <main className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 pb-12 max-w-[1280px] mx-auto">
      <Categories />;
    </main>
  );
}
