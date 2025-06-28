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

export async function uploadImages(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: `e-store`,
  });
  return result.secure_url;
}

export async function getSingleImagesPerCategory(categoryId: string) {
  console.log("u getSingleImagesPerCategory", categoryId);
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: `e-store/${categoryId}`,
    resource_type: "image",
    max_results: 12,
  });
  // mozda ne treba da bude prvi nego svaki, vidjecu
  console.log('ovo me isto zanima', result.resources)
  return result.resources.map((resource) => resource.secure_url)[0] || null;
}
