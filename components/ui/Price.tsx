import FloatingLabelInput from "./FloatingLabelInput";

export default function Price({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute bottom-1/2 translate-y-1/2 left-1">$</span>
      <FloatingLabelInput>{children}</FloatingLabelInput>
    </div>
  );
}
