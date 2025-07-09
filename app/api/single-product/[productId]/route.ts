import successFactory from "@/services/success";
import errorFactory from "@/services/error";
import prisma from "@/prisma/prismaClient";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ productId: string }>;
  }
) {
  const { productId } = await params;

  const [singleProduct, productImages] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
    }),
    prisma.productImage.findMany({
      where: { productId },
      select: { imageUrl: true },
    }),
  ]);

  if (!singleProduct || !productImages) {
    return errorFactory.notFound("Product with this id has not been found");
  }

  const data = { ...singleProduct, images: productImages };

  return successFactory.ok(data, "Single product fetched successfully");
}
