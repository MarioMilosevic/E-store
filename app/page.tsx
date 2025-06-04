import Categories from "@/components/Categories";

export default function Home() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 py-12 max-w-[1280px] mx-auto">
      <Categories />
    </div>
  );
}
