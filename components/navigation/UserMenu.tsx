"use client";

import useUserStore from "@/store/userStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { CircleUserRound, CirclePlus } from "lucide-react";
import { toast } from "sonner";

export default function UserMenu() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const logOut = async () => {
    console.log("log out clicked");
    const response = await fetch("/api/logout", {
      method: "DELETE",
    });
    console.log(response);

    if (!response.ok) {
      toast.error("Logout failed. Please try again.");
    } else {
      toast.success("Logout successful");
      setUser(null);
    }

    // const res = await response.json();
    // console.log(res)
    // if(res.success) {
    //   console.log('logout success');
    // } else {
    //   console.error('logout failed', res.message);
    // }

    // setUser(null);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }
  return (
    <div className="flex gap-4 items-center">
      {user ? (
        <>
          <Link href={"/add-product"} className="flex flex-col items-center">
            <CirclePlus size={20} className="cursor-pointer" />
            <p>Add product</p>
          </Link>
          <Link href={"/profile"} className="flex flex-col items-center">
            <CircleUserRound size={20} className="cursor-pointer" />
            <p>Profile</p>
          </Link>
          <Button onClick={logOut}>Log out</Button>
        </>
      ) : (
        <>
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </>
      )}
    </div>
  );
}
