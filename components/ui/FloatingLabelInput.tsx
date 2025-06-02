import { FloatingInput, FloatingLabel } from "./floating-label-input";
import { cn } from "@/lib/utils";

type FloatingLabelInputProps = {
  className: string;
};

const FloatingLabelInput = ({ className }: FloatingLabelInputProps) => {
  return (
    <div className={cn("relative", className)}>
      <FloatingInput id="floating-input" />
      <FloatingLabel htmlFor="floating-label">Search</FloatingLabel>
    </div>
  );
};

export default FloatingLabelInput;
