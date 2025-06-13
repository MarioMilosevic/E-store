"use client";

import { useEffect } from "react";
import useUserStore from "@/store/userStore";
import { UserType } from "@/lib/types";

export default function ClientProvider({ user }: { user: UserType | null }) {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    if (user?.id) {
      setUser(user);
    }
  }, [user, setUser]);
  return null;
}
