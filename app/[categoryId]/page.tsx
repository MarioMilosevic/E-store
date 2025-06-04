import { CategoriesSidebar } from "@/components/categories/CategoriesSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
export default async function page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  console.log(categoryId);

  return (
    <>
      <SidebarProvider>
        <CategoriesSidebar />
      </SidebarProvider>
      <h2>{categoryId}</h2>;
    </>
  );
}
