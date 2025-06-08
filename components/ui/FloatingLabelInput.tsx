import { FloatingInput, FloatingLabel } from "./floating-label-input";
import { cn } from "@/lib/utils";

type FloatingLabelInputProps = {
  className?: string;
  children: React.ReactNode;
  field?: React.InputHTMLAttributes<HTMLInputElement>,
  id:string
};

const FloatingLabelInput = ({
  className,
  children,
  id,
  field
}: FloatingLabelInputProps) => {
  console.log(field)
  return (
    <div className={cn("relative", className)}>
      <FloatingInput id={id} {...field} />
      <FloatingLabel htmlFor={id}>{children}</FloatingLabel>
    </div>
  );
};

export default FloatingLabelInput;
