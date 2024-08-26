import { useEffect, useMemo, useState } from "react";
import { WordType } from "../utils/types";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { createPortal } from "react-dom";
import { DeleteModal } from "../components/DeleteModal";
import { useHomeStore } from "../stores/homeStore";
import { v4 as uuidv4 } from "uuid";
import { useRenderCount } from "@uidotdev/usehooks";
import { Button, GetProps, Input, message, Spin } from "antd";
import { IoPencil, IoTrash } from "react-icons/io5";
import "../css_modules/pagination.css";
import { CustomPagination } from "../components/CustomPagination";
import { Sorting } from "../components/Sorting";
import { useAppStore } from "../stores/appStore";

const { Search } = Input;

export default function AdminHomePage() {
  const {
    words,
    setWords,
    getAllWords,
    itemsPerPage,
    setCurrentPage,
    currentPage,
    // searchWords,
    fullTextSearch,
    sortBy,
    orderBy,
  } = useHomeStore((state) => state);
  const [total, setTotal] = useState<number>(0);
  // const pagesCount = Math.ceil(total / itemsPerPage);
  const [foundWords, setFoundWords] = useState<WordType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedWordId, setSelectedWordId] = useState<number>(0);
  const renderCount = useRenderCount();
  const { isAppLoading, setIsAppLoading } = useAppStore();

  console.log("renderCount: ", renderCount);

  useEffect(() => {
    const fetchWords = async () => {
      const result = await getAllWords();
      setWords(result.data.words);
      setTotal(result.data.count);
    };

    fetchWords();
  }, [currentPage, getAllWords, setWords, sortBy, orderBy]);

  const pageCount = useMemo(() => Math.ceil(total / itemsPerPage), [total, itemsPerPage]);

  // Debounce function
  // const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
  //   let timeoutId: ReturnType<typeof setTimeout>;
  //   return (...args: T) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };
  type SearchProps = GetProps<typeof Input.Search>;

  const handleSearch: SearchProps["onSearch"] = async (value) => {
    if (!value.trim()) {
      message.error("Пожайлуйста введите слово для поиска!");
      return;
    }
    setIsAppLoading(true);
    const result = await fullTextSearch(value);
    setFoundWords(result.data);
    setIsAppLoading(false);

    if (result.data.length === 0) {
      message.error("Слово не найдено.");
    }
  };

  // const handleSearch = async () => {
  //   const result = await searchWords(queryText);
  //   console.log(result);
  //   setFoundWords(result.data);
  // };

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const renderedWords = (arr: WordType[]) => {
    return arr.map((word: WordType) => {
      return (
        <div
          className="flex p-1  shadow-sm rounded  mb-2 justify-between items-center"
          key={uuidv4()}
        >
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-m">{word.word}</h2>
          </div>
          <div className="flex gap-4">
            <Link to={`/edit-word/${word.id}`}>
              <Button shape="circle" icon={<IoPencil />} />
            </Link>

            <Button
              shape="circle"
              icon={<IoTrash />}
              danger
              onClick={() => {
                setShowModal(true);
                setSelectedWordId(word.id);
              }}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-5">
      <Spin fullscreen spinning={isAppLoading} />
      <Link to={"/add-word"}>
        <Button
          style={{ height: "4rem", width: "4rem" }}
          shape="circle"
          icon={<LuPlus />}
          className="fixed right-20 bottom-20 text-3xl"
          color="green-300"
        />
      </Link>

      <Search
        placeholder="input search text"
        allowClear
        size="large"
        onSearch={handleSearch}
        className="mb-5"
      />
      <Sorting />

      <div className="mb-auto">
        {foundWords.length > 0 ? renderedWords(foundWords) : renderedWords(words)}
      </div>
      {showModal &&
        createPortal(
          <DeleteModal wordId={selectedWordId} onClose={() => setShowModal(false)} />,
          document.body
        )}

      <CustomPagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}
