import { create } from "zustand";

interface UserStore {
  currentUser: object;
  isAuth: boolean;
}

const useUserStore = create<UserStore>((set) => ({
  currentUser: {},
  isAuth: false,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}));
