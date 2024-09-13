import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { WordType } from "../utils/types";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { createPortal } from "react-dom";
import { DeleteModal } from "../components/DeleteModal";
import { useHomeStore } from "../stores/homeStore";
import { v4 as uuidv4 } from "uuid";
import { Button, GetProps, Input, message, Spin } from "antd";
import { IoPencil, IoTrash } from "react-icons/io5";
import "../css_modules/pagination.css";
import { CustomPagination } from "../components/CustomPagination";
import { Sorting } from "../components/Sorting";
import { LoadingOutlined } from "@ant-design/icons";
import { useAllWords } from "../hooks/useAllWords";
import { useFullTextSearch } from "../hooks/useFullTextSearch";

const { Search } = Input;

export default function AdminHomePage() {
  const { words, setWords, itemsPerPage, setCurrentPage, currentPage, sortBy, orderBy } =
    useHomeStore((state) => state);
  const [total, setTotal] = useState<number>(0);
  const [foundWords, setFoundWords] = useState<WordType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedWordId, setSelectedWordId] = useState<number>(0);
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: res, isLoading, isError, error } = useAllWords(sortBy, orderBy);
  const fts = useFullTextSearch(searchTerm);

  useEffect(() => {
    if (res) {
      setWords(res.data.words);
      setTotal(res.data.count);
    }
  }, [res, setWords]);

  const pageCount = useMemo(() => Math.ceil(total / itemsPerPage), [total, itemsPerPage]);

  type SearchProps = GetProps<typeof Input.Search>;

  const handleSearch: SearchProps["onSearch"] = async (value) => {
    if (!value.trim()) {
      setFoundWords(words);
      setSearchMode(false);
      return;
    }
    const rf = await fts.refetch();

    if (rf.data && rf.data.data) {
      if (rf.data?.data.length === 0) {
        message.error("Слово не найдено.");
      } else {
        setFoundWords(rf.data.data);
      }
    } else {
      message.error("Ошибка при поиске.");
    }
    setSearchMode(true);
  };

  const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const renderedWords = (arr: WordType[]) => {
    if (isLoading || fts.isFetching) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          Что-то пошло не так: {error.message}
        </div>
      );
    }

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
      {/* <Spin fullscreen spinning={isAppLoading} /> */}
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
        onChange={handleSearchTerm}
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

      {searchMode === true ? null : (
        <CustomPagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
