import { useQuery } from "@tanstack/react-query";
import { getAllWords } from "../services/apiService";

export function useAllWords(sortBy: string, orderBy: string) {
  return useQuery({
    queryKey: ['all-words', sortBy, orderBy],
    queryFn: () => getAllWords(),
  })
}