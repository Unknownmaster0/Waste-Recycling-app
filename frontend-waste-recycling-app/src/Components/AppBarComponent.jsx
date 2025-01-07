import { useNavigate } from "react-router-dom";
import ButtonComponent from "./Button";

export const AppBar = function ({ username = null, logout = false }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-sm border bg-white p-2 shadow-default md:p-4 flex justify-between">
      <div className="font-bold sm:text-2xl text-lg md:text-4xl">
        Waste Recycling Center
      </div>
      {username && (
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="text-lg sm:text-xl">Hello</div>
          <div className="border-2 border-blue-400 rounded-full h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center">
            <div className="text-2xl sm:text-3xl">{username[0]}</div>
          </div>
          {logout && (
            <ButtonComponent
              text={"Log out"}
              onClickHandler={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              type={"logout"}
            />
          )}
        </div>
      )}
    </div>
  );
};
