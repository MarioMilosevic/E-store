"use client";

import { useEffect } from "react";
import useUserStore from "@/store/userStore";
import { UserType } from "@/lib/types";

type ClientProviderType = {
  user: UserType | null;
  children: React.ReactNode;
};

export default function ClientProvider({ user, children }: ClientProviderType) {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    if (user?.id) {
      setUser(user);
    }
  }, [user, setUser]);
  return <>{children};</>;
}
