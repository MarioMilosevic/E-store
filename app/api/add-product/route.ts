import { addProductFormSchema } from "@/lib/zodSchemas";
import successFactory from "@/services/success";
import errorFactory from "@/services/error";
import { uploadImage } from "@/lib/cloudinary";
import { z } from "zod";

// const serverAddProductSchema = addProductFormSchema.omit({ image: true });
// const serverAddProductSchema = addProductFormSchema.extend({
//   image: z.array(serverImageSchema).nonempty("At least one image is required"),
// });
const serverAddProductSchema = addProductFormSchema.extend({
  image:z.string().url().or(z.string().startsWith("data:image/"))
})

export async function POST(req: Request) {
  const response = await req.json();
  console.log("sta je ovo", response);
  const result = serverAddProductSchema.safeParse(response);
  // image: [ { path: './Mario.jpg', relativePath: './Mario.jpg' } ]

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

  let imageUrl = "";
  try {
    imageUrl = await uploadImage(image);
    console.log("ovo je imageUrl nakon", imageUrl);
  } catch (error) {
    console.log("ovo je error,", error);
    return errorFactory.internalServerError("Image upload failed");
  }

  return successFactory.ok("uspjelo", "uspjeh");
}
