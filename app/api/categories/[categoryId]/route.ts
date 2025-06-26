import errorFactory from "@/services/error";
import prisma from "@/prisma/prismaClient";
import successFactory from "@/services/success";
import { getCategoryImages } from "@/lib/cloudinary";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  console.log("ovo me zanima", categoryId);

  const [images, products] = await Promise.all([
    getCategoryImages(categoryId),
    prisma.product.findMany({
      where: {
        category: categoryId,
      },
    }),
  ]);

  // const images = await getCategoryImages(categoryId);

  // const products = await prisma.product.findMany({
  //   where: {
  //     category: categoryId,
  //   },
  // });
  if (!products || !images) {
    return errorFactory.notFound("Category not found");
  }
  // const images = await getImages()
  const data = {
    products,
    images,
  };

  return successFactory.ok(data, "Products fetched successfully");
}
