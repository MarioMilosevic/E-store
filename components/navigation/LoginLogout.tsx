"use client";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { logout } from "@/actions/logout";
// import { deleteSession } from "@/lib/session";

export default function LoginLogout() {
  const user = useUserStore((state) => state.user);

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
