import { LoaderFunction } from "react-router-dom";
import { convertToCamelCase } from "../../utils/caseConverter";
import { getWord } from "../../services/apiService";



export const wordLoader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.wordId as string);

  const response = await getWord(id);
  const wordObj = convertToCamelCase(response.data[0]);
  return wordObj;
}