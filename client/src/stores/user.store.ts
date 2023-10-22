import { create } from "zustand";
import { IUser } from "../actions/user";

interface IUserStore {
  currentUser: IUser | null;
  isAuth: boolean;
  userAuthorization: (user: IUser) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  currentUser: null,
  isAuth: false,
  userAuthorization: (user: IUser) => set({ currentUser: user, isAuth: true }),
}));
