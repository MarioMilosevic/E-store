import SingleCategory from "@/components/singleCategory/SingleCategory";

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
  const data = await response.json();
  console.log("Fetched category data:", data);

  if (data.success === false) {
    return <p>{data.message}</p>;
  }

  return <SingleCategory />;
}
