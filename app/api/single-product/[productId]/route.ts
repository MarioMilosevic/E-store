import successFactory from "@/services/success";
// import errorFactory from "@/services/error";
// import prisma from "@/prisma/prismaClient";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ productId: string }>;
  }
) {
  console.log('uslo odje jebem mu materrrrrrrrrrrsdewwwwwwwwwwwwwwwwwwwwiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii022222222223002')
  const { productId } = await params;
  console.log("ovo me znaima", productId);
  // return successFactory.ok(productId, "Eo ti na")
  return successFactory.ok(productId, 'ovo je productId')
}
