

import { create } from "zustand";

interface I_AppStore {
  isAppLoading: boolean;
  isLogged: boolean;
}

interface I_AppStoreActions {
  setIsAppLoading: (isAppLoading: boolean) => void;
  setIsLogged: (isLogged: boolean) => void;

}

const checkIfIsLogged = () => {
  const token = localStorage.getItem('authToken');
  return token ? true : false;
}

const initialState = {
  isAppLoading: false,
  isLogged: checkIfIsLogged()
};

export const useAppStore = create<I_AppStore & I_AppStoreActions>()((set) => ({
  ...initialState,
  setIsAppLoading: (isAppLoading: boolean) => set({ isAppLoading }),
  setIsLogged: (isLogged: boolean) => set({ isLogged }),

}));