import ButtonComponent from "../Components/Button";
import OptionsRendrer from "../Components/OptionsRendrer";
import ProgressBar from "../Components/Progress-bar";
import QuestionRendrer from "../Components/QuestionRendrer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextRendrer from "../Components/TextRendrer";
import questionStyle from "../Styles/questionStyle";

export default function QuizPage({ data, currentPage, setCurrentPage }) {
  const navigate = useNavigate();
  const totalQuestions = data.length;
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [isBtnActive, setIsbtnActive] = useState(false);
  const [btnText, setText] = useState("CHECK");
  const [pressedOption, setOption] = useState(-1);

  const currentPageItem = data.slice(currentPage - 1, currentPage);
  const questionPassed =
    (currentPage - 1) * questionsPerPage * (100 / totalQuestions); // this the number of questions answered earlier

  function onClickHandlerCancel() {
    navigate("/");
  }

  function onClickHandlerCheck() {
    if (btnText === "CONTINUE") {
      if (currentPage * questionsPerPage < totalQuestions)
        setCurrentPage((prev) => prev + 1);
      else {
        return (
          <div>
            <TextRendrer text={"END OF QUIZ"} textStyle={questionStyle} />
          </div>
        );
      }
      // THEN CONTINUE TO NEXT QUESTION, BUT BEFORE THAT, AGAIN MAKE THE
      // BTN -> NOT ACTIVE
      // BTN-TEXT -> CHECK
      // PRESSED OPTION -> -1
      setIsbtnActive(false);
      setText("CHECK");
      setOption(-1);
    } else {
      setText("CONTINUE");
      // THEN CHECK DOES THE PRESSED OPTION IS CORRECT OR NOT.
      // IF THE PRESSED OPTION IS CORRECT, THEN SHARE THE MSG OF CORRECT ANSWER OR IF WRONG THEN WRONG ANSER TO THE USER.
      if (pressedOption === data[currentPage - 1].correct_answer) {
        console.log(`correct answer`);
      } else {
        console.log(`wrong answer`);
      }
    }
  }

  return (
    <div className="h-screen">
      <div className="pl-10 pr-10 sm:pt-10 pt-5">
        <ProgressBar width={questionPassed} />
        <div className="h-auto flex justify-center mt-16 sm:mt-20">
          <div className="flex flex-col justify-evenly">
            <RenderData
              data={currentPageItem}
              setBtn={setIsbtnActive}
              setOption={setOption}
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
          <ButtonComponent
            text={btnText}
            onClickHandler={isBtnActive ? onClickHandlerCheck : null}
            type="check"
            isBtnActive={isBtnActive}
          />
        </div>
      </div>
    </div>
  );
}

function RenderData({ data, setBtn, setOption }) {
  return (
    <>
      {data?.length > 0 &&
        data?.map((data) => (
          <div key={data._id} className="md:space-y-10 space-y-4">
            <QuestionRendrer question={data.question} />
            <OptionsRendrer
              options={data.options}
              setBtn={setBtn}
              setOption={setOption}
            />
          </div>
        ))}
    </>
  );
}
