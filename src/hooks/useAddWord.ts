import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWord } from "../services/apiService";
import { WordType } from "../utils/types";

export function useAddWord() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => addWord(),
    onSuccess: (newWord: WordType) => {
      console.log(newWord)
      // queryClient.invalidateQueries({ queryKey: ['all-words'] }),
      queryClient.setQueryData(["all-words"], (oldData: WordType[]) => {
        return oldData ? [...oldData, newWord] : [newWord];
      })
    }
  })
}