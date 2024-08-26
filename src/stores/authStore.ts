import { AxiosPromise } from "axios";
import { create } from "zustand";
import { gafarApi } from "../apis/gafarApis";


interface User {
  id: number;
  username: string;
  role: string;
}

interface I_AuthStore {
  user: User | null;
}

interface I_AuthStoreActions {
  setUser: (user: User | null) => void;
  register: (userData: unknown) => Promise<AxiosPromise>
  login: (userData: unknown) => Promise<AxiosPromise>
  admin: () => Promise<AxiosPromise>
}

export const useAuthStore = create<I_AuthStore & I_AuthStoreActions>()((set) => ({
  setUser: (user: User | null) => set({ user }),
  user: null,
  register: async (userData: unknown): Promise<AxiosPromise> => {
    const response = await gafarApi.post('/auth/register', userData);
    return response;
  },
  login: async (userData): Promise<AxiosPromise> => {
    const response = await gafarApi.post('/auth/login', userData);

    return response;
  },
  admin: async (): Promise<AxiosPromise> => {
    const response = await gafarApi.get('/auth/admin');
    return response;

  },


}));