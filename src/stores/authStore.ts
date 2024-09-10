import { create } from "zustand";

interface I_AuthStore {
  user: string | null;
}

interface I_AuthStoreActions {
  setUser: (user: string | null) => void;
  // register: (userData: unknown) => Promise<AxiosPromise>;
  // login: (userData: unknown) => Promise<AxiosPromise>;
  // admin: () => Promise<AxiosPromise>;
}

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? user : null;
};

const initialState = {
  user: getUser()
}

export const useAuthStore = create<I_AuthStore & I_AuthStoreActions>()(

  (set) => ({
    ...initialState,
    setUser: (user: string | null) => set({ user }),
    user: getUser(),

  })
);
