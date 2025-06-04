import { FloatingInput, FloatingLabel } from "./floating-label-input";
import { cn } from "@/lib/utils";

type FloatingLabelInputProps = {
  className?: string;
  children: React.ReactNode;
};

const FloatingLabelInput = ({
  className,
  children,
}: FloatingLabelInputProps) => {
  return (
    <div className={cn("relative", className)}>
      <FloatingInput id="floating-input" />
      <FloatingLabel htmlFor="floating-label">{children}</FloatingLabel>
    </div>
  );
};

export default FloatingLabelInput;
