export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  console.log(categoryId);
  return new Response(JSON.stringify({ categoryId }), {
    status: 200,
  });
}
