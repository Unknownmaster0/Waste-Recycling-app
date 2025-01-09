import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner";
import AppProvider from "./Components/AppProvider";
const MapWithDirection = lazy(() => import("./Components/MapWithDirection"));
const ParentQuiz = lazy(() => import("./Components/ParentQuiz"));
const MainPage = lazy(() => import("./Pages/Main.page"));
const LoginPage = lazy(() => import("./Pages/Login.page"));
const SignupPage = lazy(() => import("./Pages/Signup.page"));

function App() {
  return (
    <AppProvider>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <div className="h-screen w-screen flex justify-center">
            <div className="bg-[#131f24] h-auto w-full">
              <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/signup" element={<SignupPage />}></Route>
                <Route path="/signin" element={<LoginPage />}></Route>
                <Route path="/quiz" element={<ParentQuiz />}></Route>
                <Route
                  path="/map-direction"
                  element={<MapWithDirection />}
                ></Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </Suspense>
    </AppProvider>
  );
}

export default App;
