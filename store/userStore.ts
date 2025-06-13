import { create } from "zustand";
import { UserType } from "@/lib/types";

type UserStore = {
  user: UserType;
  setUser: (user: UserType) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: {
    id: 0,
    fullName: "",
    email: "",
    createdDate: null,
    role: "USER",
  },
  setUser: (user) => set({ user }),
}));

export default useUserStore;
