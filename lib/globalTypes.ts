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

