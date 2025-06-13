import { create } from "zustand";
import { UserType } from "@/lib/types";

type UserStore = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user:null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
