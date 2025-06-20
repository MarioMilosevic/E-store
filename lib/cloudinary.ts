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

export async function uploadImage(
  filePath: string,
  userId: number,
  productId: string
) {
  console.log("ovo je filePath", filePath);
  console.log("ovo je userID", userId);
  console.log("ovo je productId", productId);
  const result = await cloudinary.uploader.upload(filePath, {
    folder: `e-store/${userId}/${productId}`,
    public_id: `${productId}/${crypto.randomUUID()}`,
  });
  return result.secure_url;
}
