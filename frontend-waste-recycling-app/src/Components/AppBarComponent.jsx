import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ButtonComponent from "./Button";
import { UserContext } from "../Context/user.context";

export function AppBar() {
  const navigate = useNavigate();
  const [isHamburger, setIsHamburger] = useState(false);
  const { userName, setUser } = useContext(UserContext);
  const [isUserBtnON, setisUserBtnON] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-transparent">
      {/* APP NAME BAR ON NAV-BAR */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://img.freepik.com/free-vector/arrows-recycle-ecology-design-flat-style_24877-60062.jpg?t=st=1736448292~exp=1736451892~hmac=29852ebedbd3316b2ff669672bc46193bb22a5eb02443a5e78b81ebb1ef94285&w=740"
            className="h-8 md:h-10"
            alt="logo loading..."
          />
          <span className="self-center text-xl lg:text-3xl font-semibold whitespace-nowrap dark:text-white font-mono tracking-tight ">
            Waste Recycle Center
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* USER ICON ONCLICK OPEN USER DROPDOWN */}
          {userName ? (
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => setisUserBtnON((prev) => !prev)}
            >
              <span className="sr-only text-white">Open user menu</span>
              <div className="border-2 border-blue-400 rounded-full h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center">
                <div className="text-2xl sm:text-3xl dark:text-zinc-300 uppercase">
                  {userName[0]}
                </div>
              </div>
            </button>
          ) : (
            <ButtonComponent
              text={"SIGN IN"}
              onClickHandler={() => {
                navigate("/signin");
              }}
              type={"signin"}
            />
          )}
          {/* USER ICON DROPDOWN OPTION STARTS HERE */}
          <div
            className={`z-50 ${
              isUserBtnON ? "block" : "hidden"
            } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {userName}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                  }}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          {/* HAMBURGER BUTTON */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
            onClick={() => {
              setIsHamburger((prev) => !prev);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* MOBILE NAVBAR OPEN WHEN THE HAMBURGER BUTTON CLICK */}
        <div
          className={`items-center justify-between ${
            isHamburger ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" className={`${buttonStyle}`} aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="/quiz" className={`${buttonStyle}`}>
                Quiz
              </a>
            </li>
            <li>
              <a href="#" className={`${buttonStyle}`}>
                Learning
              </a>
            </li>
            <li>
              <a href="#" className={`${buttonStyle}`}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const buttonStyle =
  "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
