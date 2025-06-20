import { addProductFormSchema } from "@/lib/zodSchemas";
import successFactory from "@/services/success";
import errorFactory from "@/services/error";

const serverAddProductSchema = addProductFormSchema.omit({image:true})

export async function POST(req: Request) {
  const response = await req.json();
  console.log("sta je ovo",response)
  const result = serverAddProductSchema.safeParse(response);

  if (!result.success) {
    return errorFactory.badRequest("Invalid input data");
  }
  console.log("proslo validaciju", result.data);

  return successFactory.ok("uspjelo", "uspjeh");
}
