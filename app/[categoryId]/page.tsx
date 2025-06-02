// import { Suspense } from "react";
export default async function page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  console.log(categoryId);

  return (
    <section className="flex flex-col items-center gap-2">
      {/* <Suspense fallback={<h1>LOADING...</h1>}> */}
        <h2>{categoryId}</h2>
      {/* </Suspense> */}
    </section>
  );
}
