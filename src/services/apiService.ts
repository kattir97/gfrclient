import { AxiosPromise, AxiosResponse } from "axios";
import { gafarApi } from "../apis/gafarApis";
import { useHomeStore } from "../stores/homeStore";
import { WordsApiResponse } from "../utils/types";
import { getWordData } from "../stores/editorStore";

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


export const addWord = async (): Promise<void> => {
  await gafarApi.post("words", getWordData());
};

export const updateWord = async (
  id: number
): Promise<AxiosResponse<{ status: string; message: string }>> => {
  const response = await gafarApi.put(`words/${id}`, getWordData());
  return response;
};



export const register = async (userData: unknown): Promise<AxiosPromise> => {
  const response = await gafarApi.post("/auth/register", userData);
  return response;
}

export const login = async (userData: unknown): Promise<AxiosPromise> => {
  const response = await gafarApi.post("/auth/login", userData);

  return response;
};


export const admin = async (): Promise<AxiosPromise> => {
  const response = await gafarApi.get("/auth/admin");
  return response;
}