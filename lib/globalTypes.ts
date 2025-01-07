import { FieldValues, Path } from "react-hook-form";

export type FormFieldObjType<T extends FieldValues> = {
  name: Path<T>;
  content: string;
  type: string;
};

export type formFieldsObjectsType = {
  id: string;
  name:
    | "condition"
    | "category"
    | "itemLocation"
    | "shippingOption"
    | "sellingMethod";
  label: string;
  initialLabel: string;
  options: {
    label: string;
    id: string;
  }[];
};

export type ProductType = {
  auctionEndsAt: string;
  buyerId: number | null;
  category: string;
  condition: string;
  createdAt: string;
  currentBid: number | null;
  description: string;
  id: string;
  location: string;
  price: number;
  sellingMethod: string;
  shippingOption: string;
  singleImage: string;
  status: string;
  title: string;
  userId:number
}