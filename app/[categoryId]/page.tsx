import { categories } from "@/lib/constants";
import { notFound } from "next/navigation";
import { ProductType } from "@/lib/globalTypes";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductCard from "@/components/ui/ProductCard";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  if (categories.findIndex((category) => category.id === categoryId) === -1) {
    notFound();
  }

  const response = await fetch(
    `http://localhost:3000/api/categories/${categoryId}`
  );
  const res = await response.json();

  if (res.success === false) {
    return <p>{res.message}</p>;
  }

  return (
    <main className="flex flex-col gap-4">
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
              <Link href={`${categoryId}`}>{categoryId}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4 flex-wrap">
        {res.data.map((data: ProductType) => (
          <ProductCard key={data.id} data={data} categoryId={categoryId} />
        ))}
      </div>
    </main>
  );
}
