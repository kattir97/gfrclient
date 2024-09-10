import { AxiosResponse } from "axios";
import { gafarApi } from "../apis/gafarApis";
import { useHomeStore } from "../stores/homeStore";
import { WordsApiResponse } from "../utils/types";

export const getWord = async (id: number): Promise<AxiosResponse> => {
  const response = await gafarApi.get(`words/${id}`);
  return response;
}

export const deleteWord = async (
  id: number
): Promise<AxiosResponse<{ status: string; message: string }>> => {
  const response = await gafarApi.delete(`words/${id}`);

  useHomeStore.setState((state) => ({
    words: state.words.filter((word) => word.id !== id)
  }));

  return response;
}

export const fullTextSearch = async (title: string): Promise<AxiosResponse> => {
  const response = await gafarApi.get(`words/full-text-search?query=${title}`);
  return response;
};

export const getAllWords = async (): Promise<AxiosResponse<WordsApiResponse>> => {
  const { itemsPerPage, currentPage, sortBy, orderBy } = useHomeStore.getState();
  const response = await gafarApi.get(
    `words?limit=${itemsPerPage}&offset=${currentPage * itemsPerPage}&sortBy=${sortBy}&orderBy=${orderBy}`
  );
  return response;
}