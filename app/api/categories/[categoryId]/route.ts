import errorFactory from "@/services/error";
import prisma from "@/prisma/prismaClient";
import successFactory from "@/services/success";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ categoryId: string }>;
  }
) {
  const { categoryId } = await params;

  const products = await prisma.product.findMany({
    where: {
      category: categoryId,
    },
  });

  if (products.length === 0) {
    return errorFactory.notFound("No products available");
  }

  const productIds = products.map((product) => product.id);

  const allImages = await prisma.productImage.findMany({
    where: {
      productId: {
        in: productIds,
      },
    },
  });

  const data = products.map((product) => {
    const firstImage = allImages.find((img) => img.productId === product.id);
    return {
      ...product,
      singleImage: firstImage?.imageUrl || null,
    };
  });

  return successFactory.ok(data, "Products fetched successfully");
}
