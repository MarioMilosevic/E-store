export default async function page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  console.log("ovo je PRODUCT ID",productId)

  

  const response = await fetch(
    `http://localhost:3000/api/single-product/${productId}`
    );
  const res = await response.json();
  console.log("Fetched category res:", res);

//   if (res.success === false) {
//     return <p>{res.message}</p>;
//   }
  return <div>mario</div>;
}
