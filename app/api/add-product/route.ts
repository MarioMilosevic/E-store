import { serverAddProductSchema } from "@/lib/zodSchemas";
import successFactory from "@/services/success";
import errorFactory from "@/services/error";
import prisma from "@/prisma/prismaClient";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: Request) {
  const response = await req.json();
  console.log("sta je ovo", response);
  const result = serverAddProductSchema.safeParse(response);

  if (!result.success) {
    return errorFactory.badRequest("Invalid input data");
  }
  console.log("proslo validaciju", result.data);

  const {
    image,
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

  const imageUrls: string[] = [];

  try {
    for (const base64Image of image) {
      const uploaded = await uploadImage(base64Image);
      imageUrls.push(uploaded);
    }
  } catch (error) {
    console.log("ovo je error,", error);
    return errorFactory.internalServerError("Image upload failed");
  }

  console.log("ovo bi trebao biti seller id", seller);

  const newProduct = await prisma.product.create({
    data: {
      category,
      condition,
      description,
      location,
      price,
      sellingMethod,
      shippingOption,
      title,
      seller: { connect: { id: seller } },
      images: {
        create: imageUrls.map(url => ({imageUrl:url}))
      }
    },
  });

  console.log("ovo me zanima", newProduct);

  ////////////////////////////////////////////////////////////////////////////////////////
 

  ///////////////////////////////////////////////////////////////////////////////////////////
  return successFactory.ok("uspjelo", "uspjeh");
}
