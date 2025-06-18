import successFactory from "@/services/success";
import errorFactory from "@/services/error";


export async function POST(req: Request) {
  const response = await req.json();
  console.log("ovo me zanima", response);
  return successFactory.ok('uspjelo', 'uspjeh')
}
