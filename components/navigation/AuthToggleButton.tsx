"use client";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function AuthToggleButton() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const logOut = async () => {
    await logout();
    setUser(null)
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <>
      {user ? (
        <Button onClick={logOut}>Log out</Button>
      ) : (
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
      )}
    </>
  );
}
