import { useMutation } from "@tanstack/react-query";
import { deleteWord } from "../services/apiService";
import { useQueryClient } from '@tanstack/react-query';

export function useDeleteWord(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteWord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-words'] })
    }
  })
}