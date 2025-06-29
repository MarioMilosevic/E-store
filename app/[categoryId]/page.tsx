import { categories } from "@/lib/constants";
import { notFound } from "next/navigation";

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
  console.log("Fetched category res:", res);

  if (res.success === false) {
    return <p>{res.message}</p>;
  }

  return (
    <>
      mario
      {/* {res.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}
    </>
  );

  // return <SingleCategory />;
}
