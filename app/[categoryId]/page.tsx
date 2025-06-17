import { CategoriesSidebar } from "@/components/categories/CategoriesSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { categories } from "@/lib/constants";
import { notFound } from "next/navigation";
export default async function page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  console.log(categoryId);
  console.log(categories);
  if (categories.findIndex((category) => category.id === categoryId)) {
    notFound();
  }
  return (
    <>
      <SidebarProvider>
        <CategoriesSidebar />
      </SidebarProvider>
    </>
  );
}
