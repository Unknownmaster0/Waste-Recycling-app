import { useState } from "react";
import useGetAllQuestions from "../Custom-hooks/useGetAllQuestions";
import QuizPage from "../Pages/Quiz.page";

export default function ParentQuiz() {
  const { data, loading, err } = useGetAllQuestions();
  const [currentPage, setCurrentPage] = useState(1);

  if (err !== null) {
    return <div>{err ? err.message : null}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <QuizPage data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}
