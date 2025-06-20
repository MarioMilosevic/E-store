import { addProductFormSchema } from "@/lib/zodSchemas";
import successFactory from "@/services/success";
import errorFactory from "@/services/error";
import { uploadImage } from "@/lib/cloudinary";
import { z } from "zod";

const serverAddProductSchema = addProductFormSchema.extend({
  image: z
    .array(z.string().startsWith("data:image/"))
    .min(1, "At least one image is required"),
});

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
    itemLocation,
    price,
    sellingMethod,
    shippingCost,
    title,
  } = result.data;

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


  return successFactory.ok("uspjelo", "uspjeh");
}
