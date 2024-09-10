import { create } from "zustand";
import { WordType } from "../utils/types";

interface I_HomeStore {
  words: WordType[];
  currentPage: number;
  itemsPerPage: number;
  title: string;
  sortBy: string;
  orderBy: string
}

interface I_HomeStoreActions {
  setWords: (words: WordType[]) => void;
  setCurrentPage: (currPage: number) => void;
  setTitle: (title: string) => void;
  setSortBy: (value: string) => void;
  setOrderBy: (value: string) => void;
}

export const useHomeStore = create<I_HomeStore & I_HomeStoreActions>()((set) => ({
  words: [],
  setWords: (words: WordType[]) => set({ words }),
  currentPage: 0,
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  itemsPerPage: 20,
  title: '',
  setTitle: (title: string) => set({ title }),
  sortBy: 'created_at',
  orderBy: 'desc',
  setSortBy: (sortBy: string) => set({ sortBy }),
  setOrderBy: (orderBy: string) => set({ orderBy }),

}));

