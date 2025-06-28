import errorFactory from "@/services/error";
import prisma from "@/prisma/prismaClient";
import successFactory from "@/services/success";
import { getSingleImagesPerCategory } from "@/lib/cloudinary";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ categoryId: string }>;
  }
) {
  const { categoryId } = await params;
  console.log("ovo me zanima", categoryId);

  const [singleImage, products] = await Promise.all([
    getSingleImagesPerCategory(categoryId),
    prisma.product.findMany({
      where: {
        category: categoryId,
      },
    }),
  ]);

  if (products.length === 0 || !singleImage) {
    return errorFactory.notFound("Category not found or no products available");
  }
  const data = {
    products,
    singleImage,
  };

  return successFactory.ok(data, "Products fetched successfully");
}
