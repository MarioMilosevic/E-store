import { categories } from "@/lib/constants";
import { notFound } from "next/navigation";
import { ProductType } from "@/lib/globalTypes";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EstoreCard from "@/components/ui/EstoreCard";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  console.log(categoryId);
  if (categories.findIndex((category) => category.id === categoryId) === -1) {
    notFound();
  }

  const response = await fetch(
    `http://localhost:3000/api/categories/${categoryId}`
  );
  const res = await response.json();
  console.log("Fetched category res:", res);

  if (res.success === false) {
    return <p>{res.message}</p>;
  }

  return (
    <main className="border border-black flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Categories</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="capitalize">
              <Link href="/components">{categoryId}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4">
      {res.data.map((data: ProductType) => (
        <EstoreCard key={data.id} data={data} />
      ))}
      </div>
    </main>
  );
}
