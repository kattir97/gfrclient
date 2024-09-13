import { useQuery } from "@tanstack/react-query";
import { getAllWords } from "../services/apiService";

export function useAllWords(sortBy: string, orderBy: string, currentPage: number) {
  return useQuery({
    queryKey: ['all-words', sortBy, orderBy, currentPage],
    queryFn: () => getAllWords(),
    placeholderData: (previousData) => {
      return previousData;
    }
  })
}