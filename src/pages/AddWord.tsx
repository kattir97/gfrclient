import { Definitions } from "../components/Defintions";
import Word from "../components/Word";
import { Examples } from "../components/Examples";
import { Conjugations } from "../components/Conjugations";
import { Tags } from "../components/Tags";
import { useNavigate } from "react-router-dom";
import { useEditorStore } from "../stores/editorStore";
import { Button, Spin } from "antd";
import { FormEvent } from "react";
import { useAppStore } from "../stores/appStore";

export function AddWord() {
  const { reset, addWord } = useEditorStore((state) => state);
  const navigate = useNavigate();
  const { isAppLoading, setIsAppLoading } = useAppStore();

  const handleAddWord = async () => {
    try {
      setIsAppLoading(true);
      await addWord();
      reset();
      navigate("/admin");
      setIsAppLoading(false);
    } catch (error) {
      setIsAppLoading(false);

      alert(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    handleAddWord(); // Call your function to add the word
  };

  return (
    <div className="flex flex-col items-center p-5">
      <Spin fullscreen spinning={isAppLoading} />
      <h1 className="text-lg font-semibold mb-5">Add Word</h1>

      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 border-b border-solid border-gray-400 p-5">
          <Word />
          <Definitions />
        </div>
        <Examples />
        {/* <DefaultMorfant /> */}
        <Conjugations />
        <Tags />
        <Button
          type="primary"
          htmlType="button"
          size="large"
          className="bg-blue-500 w-full"
          onClick={handleSubmit}
        >
          Add Word
        </Button>
      </form>
    </div>
  );
}
