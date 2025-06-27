import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not set");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not set");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not set");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImages(
  filePath: string,
  data: {
    userId: number;
    productId: string;
    category: string;
  }
) {
  const { userId, productId, category } = data;
  const result = await cloudinary.uploader.upload(filePath, {
    folder: `e-store/${category}/${userId}/${productId}`,
  });
  return result.secure_url;
}

export async function getSingleImagePerCategory(categoryId: string) {
  console.log("u getSingleImagePerCategory", categoryId);
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: `e-store/${categoryId}`,
    resource_type: "image",
    max_results: 1,
  });
  console.log("ovo je neki result", result);
  // mozda ne treba da bude prvi nego svaki, vidjecu
  return result.resources[0].secure_url || null;
}
