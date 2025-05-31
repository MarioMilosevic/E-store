import { FloatingInput, FloatingLabel } from "./ui/floating-label-input";

const FloatingLabelInput = () => {
  return (
    <div className="relative">
      <FloatingInput id="floating-input" />
      <FloatingLabel htmlFor="floating-label">Search</FloatingLabel>
    </div>
  );
};

export default FloatingLabelInput;
