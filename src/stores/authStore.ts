import { AxiosPromise } from "axios";
import { create } from "zustand";
import { gafarApi } from "../apis/gafarApis";

interface I_AuthStore {
  user: string | null;
}

interface I_AuthStoreActions {
  setUser: (user: string | null) => void;
  register: (userData: unknown) => Promise<AxiosPromise>;
  login: (userData: unknown) => Promise<AxiosPromise>;
  admin: () => Promise<AxiosPromise>;
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
    register: async (userData: unknown): Promise<AxiosPromise> => {
      const response = await gafarApi.post("/auth/register", userData);
      return response;
    },
    login: async (userData): Promise<AxiosPromise> => {
      const response = await gafarApi.post("/auth/login", userData);

      return response;
    },
    admin: async (): Promise<AxiosPromise> => {
      const response = await gafarApi.get("/auth/admin");
      return response;
    },
  })
);
