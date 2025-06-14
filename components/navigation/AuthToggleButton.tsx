"use client";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function AuthToggleButton() {
  const user = useUserStore((state) => state.user);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <>
      {user ? (
        <Button formAction={logout}>Log out</Button>
      ) : (
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
      )}
    </>
  );
}
