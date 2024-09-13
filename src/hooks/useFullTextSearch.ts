import { useQuery } from "@tanstack/react-query";
import { fullTextSearch } from "../services/apiService";

export function useFullTextSearch(term: string) {
  return useQuery({
    queryKey: ['foundWords'],
    queryFn: () => fullTextSearch(term),
    enabled: false,
  });
}