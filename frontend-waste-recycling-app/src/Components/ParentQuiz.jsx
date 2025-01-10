import { useEffect, useState } from "react";
import QuizPage from "../Pages/Quiz.page";
import Spinner from "./Spinner";
import { QuizContext } from "../Context/Quiz.context";
import useGetLoggedIn from "../Custom-hooks/useGetLoggedIn";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./Button";

export default function ParentQuiz() {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    loading: loadLogging,
    err: errorLogin,
  } = useGetLoggedIn();
  const [currentPage, setCurrentPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [pressedOption, setOption] = useState(null);

  if (errorLogin) {
    console.log(`i am from here`);
    return (
      <div className="h-screen flex justify-center items-center">
        <div
          className={`bg-[#131f24] h-28 md:h-36 rounded-xl flex flex-col justify-center items-center mt-4 md:mt-2 border-t-2 border-l-2 border-r-2 border-b-4 px-2 sm:px-3 md:px-4 space-y-4
      `}
        >
          <div className="text-xl md:text-2xl font-semibold text-fuchsia-100 text-wrap">
            {errorLogin}
          </div>
          <ButtonComponent
            text={"SIGN IN"}
            onClickHandler={() => navigate("/signin")}
            type={"signin"}
          />
        </div>
      </div>
    );
  }

  if (loadLogging) {
    return <Spinner />;
  }

  return (
    <QuizContext.Provider value={{ pressedOption, setOption }}>
      {isLoggedIn ? (
        <>
          <QuizPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            load={load}
            setLoad={setLoad}
          />
        </>
      ) : null}
    </QuizContext.Provider>
  );
}
