import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopbarComponent";
import { TopBarText } from "./TopBarTextComponent";
import { InputComponent } from "./InputBoxComponent";
import ButtonComponent from "./Button";
import axios from "axios";
import { BottomTexts } from "./BottomTextComponent";

export const Signin = function ({setLoading}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <TopBar label={"Sign In"} />
        <TopBarText text={"Enter the details to "} to={"signin"} />
        <InputComponent
          onChange={(e) => setUsername(e.target.value)}
          label={"Email"}
          placeholder={"johndoe@gmail.com"}
        />
        <InputComponent
          onChange={(e) => setPassword(e.target.value)}
          label={"Password"}
          placeholder={""}
        />
        <ButtonComponent
          text={"Sign In"}
          onClickHandler={async () => {
            setLoading(true);
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/login-pass`,
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", `${response.data.data}`);

              if (response.data.success) {
                setLoading(false);
                navigate("/main");
                return;
              }
            } catch (error) {
              alert(error.message);
            }finally{
              setLoading(false);
            }
          }}
        />
        <BottomTexts text={"Create Account?"} buttonText={"SignUp"} to={"/"} />
      </div>
    </div>
  );
};
