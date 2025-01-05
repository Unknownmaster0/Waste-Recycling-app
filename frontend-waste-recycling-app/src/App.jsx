import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ParentQuiz from "./Components/ParentQuiz";
import MainPage from "./Pages/Main.page";
import LoginPage from "./Pages/Login.page";
import SignupPage from "./Pages/Signup.page";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex justify-center">
        <div className="bg-[#131f24] h-auto w-full">
          <Routes>
            <Route path="/" element={<SignupPage />}></Route>
            <Route path="/signin" element={<LoginPage />}></Route>
            <Route path="/main" element={<MainPage />}></Route>
            <Route path="/quiz" element={<ParentQuiz />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
