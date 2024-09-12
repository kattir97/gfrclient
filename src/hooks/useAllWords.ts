import { useQuery } from "@tanstack/react-query";
import { getAllWords } from "../services/apiService";

export function useAllWords() {
  return useQuery({
    queryKey: ['all-words',],
    queryFn: () => getAllWords()
  })
}