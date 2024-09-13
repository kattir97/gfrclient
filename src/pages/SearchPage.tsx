import { GetProps, Input, message, Spin } from "antd";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Card } from "antd";
import { WordType } from "../utils/types";
import Mark from "mark.js";
import { v4 as uuidv4 } from "uuid";
import "./css/styles.css";
import { useFullTextSearch } from "../hooks/useFullTextSearch";
import { LoadingOutlined } from "@ant-design/icons";

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const SearchPage: React.FC = () => {
  const [foundWords, setFoundWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const elementRef = useRef<HTMLElement | null>(null);

  const { isFetching, isError, refetch, error, isLoading } = useFullTextSearch(searchTerm);

  useEffect(() => {
    elementRef.current = document.querySelector("#search-node");
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      const markInstance = new Mark(elementRef.current);
      markInstance.unmark({
        done: () => {
          markInstance.mark(searchTerm); // Mark the new search term
        },
      });
    }
  }, [foundWords]);

  const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearch: SearchProps["onSearch"] = async (value) => {
    setFoundWords([]);
    if (!value.trim()) {
      message.error("Пожайлуйста введите слово для поиска!");
      return;
    }
    if (value.trim().length < 2) {
      message.error("Длина слова должна быть больше двух букв");
      return;
    }

    const rf = await refetch();
    // const result = await refetch();
    if (rf?.data?.data) {
      setFoundWords(rf.data.data);
      if (rf.data.data.length === 0) {
        message.error("Слово не найдено.");
      }
    }
  };

  const loadingWord =
    isLoading || isFetching ? (
      <div className="w-full h-full flex items-center justify-center">
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    ) : null;

  const errorDiv = isError ? (
    <div className="w-full h-full flex items-center justify-center">
      Что-то пошло не так: {error.message}
    </div>
  ) : null;

  const renderedWords = () => {
    return foundWords.map((w: WordType) => {
      const defs = w.definitions;
      const exs = w.examples.map((ex) => {
        return (
          <div className="flex flex-col gap-1" key={uuidv4()}>
            <p>
              <span className="font-medium">{ex.example}</span> - {ex.translation}
            </p>
          </div>
        );
      });

      const conjs = w.conjugations.map((con) => {
        return (
          <div className="mb-2" key={uuidv4()}>
            <p className="font-medium">
              {con.conjugation} {con.morfant && `(${con.morfant})`}
            </p>
            <p className="italic">{con.translation}</p>
          </div>
        );
      });

      return (
        <Card key={w.id} className="p-6" style={{ padding: "0" }}>
          <h2 className="text-3xl bold">{w.word}</h2>
          <h4 className="text-sm italic mb-2">{w.description}</h4>
          <div className="flex flex-col gap-2">
            <Card title="Значения" bordered={false} size="small" style={{ boxShadow: "none" }}>
              {defs.map((def, idx) => {
                return (
                  <ol className="list-disc" key={idx}>
                    <li>{def}</li>
                  </ol>
                );
              })}
            </Card>
            {exs.length >= 1 ? (
              <Card title="Примеры" bordered={false} size="small" style={{ boxShadow: "none" }}>
                {exs}
              </Card>
            ) : null}
            {conjs.length >= 1 ? (
              <Card title="Cклонения" bordered={false} size="small" style={{ boxShadow: "none" }}>
                {conjs}
              </Card>
            ) : null}
          </div>
        </Card>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-5">
      <Search
        placeholder="Введите слово для поиска..."
        // allowClear
        size="large"
        onSearch={handleSearch}
        onChange={handleSearchTerm}
        className="mb-5"
      />

      <div className="flex flex-col gap-2" id="search-node">
        {loadingWord}
        {errorDiv}
        {foundWords.length > 0 && renderedWords()}
      </div>
    </div>
  );
};

export default SearchPage;
