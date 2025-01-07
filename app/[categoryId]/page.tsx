import { categories } from "@/lib/constants";
import { notFound } from "next/navigation";
import EstoreCard from "@/components/ui/EstoreCard";
import { ProductType } from "@/lib/globalTypes";


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
      {res.data.map((data:ProductType) => <EstoreCard key={data.id} data={data}/>)}
      {/* res.data ima vise propertija nego sto EtoreCard prima, pa to moram prilagoditi */}
     mario {/* {res.data.map((category) => (
        <EstoreCard key={category.id} data={category} />
      ))} */}
    </>
  );

  // return <SingleCategory />;
}
