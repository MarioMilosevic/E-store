import { FieldValues, Path } from "react-hook-form";

export type FormFieldObjType<T extends FieldValues> = {
  name: Path<T>;
  content: string;
  type: string;
};