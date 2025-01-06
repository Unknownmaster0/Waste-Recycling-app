import { useState } from "react";
import useGetAllQuestions from "../Custom-hooks/useGetAllQuestions";
import QuizPage from "../Pages/Quiz.page";
import Spinner from "./Spinner";

export default function ParentQuiz() {
  const { data, loading, err } = useGetAllQuestions();
  const [currentPage, setCurrentPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [pressedOption, setOption] = useState(null);

  if (err !== null) {
    return <div>{err ? err.message : null}</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <QuizPage
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        load={load}
        setLoad={setLoad}
        pressedOption={pressedOption}
        setOption={setOption}
      />
    </>
  );
}
