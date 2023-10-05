import { create } from "zustand/esm";

interface FileStore {
  currentUser: object;
  isAuth: boolean;
}

const useFileStore = create<FileStore>((set) => ({
  currentUser: {},
  isAuth: false,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}));
