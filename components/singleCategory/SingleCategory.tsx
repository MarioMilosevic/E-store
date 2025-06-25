import { CategoriesSidebar } from "@/components/categories/CategoriesSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SingleCategory() {
  return (
    <>
      <SidebarProvider>
        <CategoriesSidebar />
      </SidebarProvider>
    </>
  );
}
