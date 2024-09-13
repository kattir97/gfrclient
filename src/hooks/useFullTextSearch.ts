import { useQuery } from "@tanstack/react-query";
import { fullTextSearch } from "../services/apiService";

export function useFullTextSearch(term: string) {
  return useQuery({
    queryKey: ['foundWords', term],
    queryFn: () => fullTextSearch(term),
    enabled: false,
    gcTime: 5000
  });
}