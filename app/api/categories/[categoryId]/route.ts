import errorFactory from "@/services/error";
import prisma from "@/prisma/prismaClient";
import successFactory from "@/services/success";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  console.log("ovo me zanima", categoryId);

  const products = await prisma.product.findMany({
    where: {
      category: categoryId,
    },
  });
  if (!products) {
    return errorFactory.notFound("Category not found");
  }

  console.log("ovo bi trebalo da sam fecovao ", products);

  return new Response(JSON.stringify({ categoryId }), {
    status: 200,
  });
}
