import SingleProduct from "@/components/singleProduct/SingleProduct";

export default async function page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const response = await fetch(
    `http://localhost:3000/api/single-product/${productId}`
  );
  const {data, message, success} = await response.json();

    if (success === false) {
      return <p>{message}</p>;
  }
  

  return <SingleProduct data={data} />;
}
