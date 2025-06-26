import { serverAddProductSchema } from "@/lib/zodSchemas";
import { uploadImages } from "@/lib/cloudinary";
import { addDays } from "date-fns";
import successFactory from "@/services/success";
import errorFactory from "@/services/error";
import prisma from "@/prisma/prismaClient";

export async function POST(req: Request) {
  const response = await req.json();
  const result = serverAddProductSchema.safeParse(response);

  if (!result.success) {
    return errorFactory.badRequest("Invalid input data");
  }

  const {
    images,
    category,
    condition,
    description,
    itemLocation: location,
    price,
    sellingMethod,
    shippingOption,
    title,
  } = result.data;
  const { seller } = response;

  const productData = {
    category,
    condition,
    description,
    location,
    price,
    sellingMethod,
    shippingOption,
    title,
    auctionEndsAt: addDays(new Date(), 3),
    seller: { connect: { id: seller } },
  };

  if (sellingMethod === "auction") {
    productData.auctionEndsAt = addDays(new Date(), 3);
  }

  const newProduct = await prisma.product.create({ data: productData });

  if (!newProduct) {
    return errorFactory.badRequest("Something went wrong please try again");
  }

  const imageUrls: string[] = [];
  const data = {
    userId: seller,
    productId: newProduct.id,
    category,
  };

  try {
    for (const base64Image of images) {
      const uploaded = await uploadImages(base64Image, data);
      imageUrls.push(uploaded);
    }
  } catch (error) {
    console.error(error);
    return errorFactory.internalServerError("Image upload failed");
  }

  const updatedProduct = await prisma.product.update({
    where: { id: newProduct.id },
    data: {
      images: {
        create: imageUrls.map((url) => ({ imageUrl: url })),
      },
    },
    include: {
      images: true,
    },
  });

  return successFactory.ok(updatedProduct, "Product created successfully");
}
