import ButtonComponent from "../Components/Button";
import OptionsRendrer from "../Components/OptionsRendrer";
import ProgressBar from "../Components/Progress-bar";
import ScoreCard from "../Components/ScoreCard";
import QuestionRendrer from "../Components/QuestionRendrer";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextRendrer from "../Components/TextRendrer";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { QuizContext } from "../Context/Quiz.context";
import useGetAllQuestions from "../Custom-hooks/useGetAllQuestions";

// PARENT QUIZ IS THE MAIN COMPONENT.
export default function QuizPage({
  currentPage,
  setCurrentPage,
  load,
  setLoad,
}) {
  const { pressedOption, setOption } = useContext(QuizContext);
  const { data, loading, err } = useGetAllQuestions();
  const navigate = useNavigate();
  const totalQuestions = data.length;
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [isBtnActive, setIsbtnActive] = useState(false);
  const [btnText, setText] = useState("CHECK");
  const [isEnd, setIsEnd] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [score, setScore] = useState(0);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const currentPageItem = data.slice(currentPage - 1, currentPage);
  const questionPassed =
    (currentPage - 1) * questionsPerPage * (100 / totalQuestions); // this the number of questions answered earlier

  function onClickHandlerCancel() {
    navigate("/");
  }

  function onClickHandlerCheck() {
    if (btnText === "CONTINUE") {
      setCurrentPage((prev) => prev + 1);
      if (currentPage * questionsPerPage === totalQuestions) {
        setIsEnd(true);
      }
      // THEN CONTINUE TO NEXT QUESTION, BUT BEFORE THAT, AGAIN MAKE THE
      // BTN -> NOT ACTIVE
      // BTN-TEXT -> CHECK
      // PRESSED OPTION -> -1
      // ISCORRECT -> NULL.
      setIsbtnActive(false);
      setText("CHECK");
      setOption(-1);
      setIsCorrect(null);
      setCorrectOption(null);
    } else {
      // THEN CHECK DOES THE PRESSED OPTION IS CORRECT OR NOT.
      // IF THE PRESSED OPTION IS CORRECT, THEN SHARE THE MSG OF CORRECT ANSWER OR IF WRONG THEN WRONG ANSER TO THE USER.
      try {
        (async () => {
          setLoad(true);
          const questionId = data[currentPage - 1]?.id;
          const answer = pressedOption;
          if (!questionId || answer === null) {
            console.error("Invalid payload:", { questionId, answer });
            alert("Please select an option before checking.");
            return;
          }

          const res = await axios.post(
            `${BACKEND_URL}/api/v1/quiz/answer`,
            { questionId, answer },
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );

          const response = await res.data;
          if (response.success) {
            if (response.message === "CORRECT ANSWER") {
              setIsCorrect(true);
              setScore((prev) => prev + 1);
            } else {
              setIsCorrect(false);
            }
            setCorrectOption(response.data.correct_option);
            setText("CONTINUE");
          } else {
            console.log(`i reached in the else block ${response.message}`);
            // ALERT THE RESPONSE MESSAGE TO THE USER.
            alert(response.message);
          }
        })();
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoad(false);
      }
    }
  }

  if (err) {
    return alert(err);
  }

  return (
    <div className="h-screen">
      {load || loading ? (
        <Spinner />
      ) : (
        <>
          {isEnd ? (
            <div className="h-full w-full flex flex-col items-center justify-center space-y-5">
              <TextRendrer
                text={"END OF QUIZ 🎉"}
                textStyle={`text-zinc-200`}
              />
              <ButtonComponent
                text="HOME"
                onClickHandler={onClickHandlerCancel}
                type="home"
              />
            </div>
          ) : (
            <>
              <div className="pl-10 pr-10 sm:pt-9 pt-5">
                <div className="sm:ml-10">
                  <div className="flex items-center justify-around space-x-2">
                    <ProgressBar width={questionPassed} />
                    <ScoreCard score={score} totalQuestions={totalQuestions} />
                  </div>
                </div>
                <div className="h-auto flex justify-center mt-10 sm:mt-5">
                  <div className="flex flex-col justify-evenly">
                    <RenderData
                      data={currentPageItem}
                      setBtn={setIsbtnActive}
                      correctOption={correctOption}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-14 md:mt-10 border-t-2 border-gray-600">
                <div className="relative top-5 flex justify-around items-center h-16">
                  <ButtonComponent
                    text="CANCEL"
                    onClickHandler={onClickHandlerCancel}
                    type="cancel"
                  />
                  {isCorrect !== null ? (
                    <TextRendrer
                      text={
                        isCorrect ? "🎉 Correct Answer!" : "😢 Wrong Answer!"
                      }
                      textStyle={`${
                        isCorrect ? "text-green-500" : "text-red-500"
                      }`}
                    />
                  ) : null}
                  <ButtonComponent
                    text={btnText}
                    onClickHandler={isBtnActive ? onClickHandlerCheck : null}
                    type="check"
                    isBtnActive={isBtnActive}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function RenderData({ data, setBtn, correctOption }) {
  return (
    <>
      {data?.length > 0 &&
        data?.map((data) => (
          <div key={data.id} className="md:space-y-10 space-y-4">
            <QuestionRendrer question={data.question} />
            <OptionsRendrer
              options={data.options}
              setBtn={setBtn}
              correctOption={correctOption}
            />
          </div>
        ))}
    </>
  );
}
