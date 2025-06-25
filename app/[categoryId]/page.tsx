import SingleCategory from "@/components/singleCategory/SingleCategory";

import { categories } from "@/lib/constants";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  const response = await fetch(
    `http://localhost:3000/api/categories/${categoryId}`
  );
  const data = await response.json();
  console.log("Fetched category data:", data);

  if (categories.findIndex((category) => category.id === categoryId) === -1) {
    notFound();
  }

  return <SingleCategory />;
}
