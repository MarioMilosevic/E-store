import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/ButtonLoading";

type FormSubmitProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  isSubmitting: boolean;
};

export default function FormSubmit({
  children,
  type,
  isSubmitting,
}: FormSubmitProps) {
  return isSubmitting ? (
    <ButtonLoading />
  ) : (
    <Button type={type}>{children}</Button>
  );
}
