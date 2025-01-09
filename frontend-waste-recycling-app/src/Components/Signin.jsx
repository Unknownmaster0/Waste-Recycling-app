import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopbarComponent";
import { TopBarText } from "./TopBarTextComponent";
import { InputComponent } from "./InputBoxComponent";
import ButtonComponent from "./Button";
import axios from "axios";
import { BottomTexts } from "./BottomTextComponent";

export const Signin = function ({
  setLoading,
  isOTP,
  setIsOtp,
  email,
  setEmail,
}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  function onClickHandlerOTP() {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/v1/user/login/send-otp?email=${email}`
        );
        const response = res.data;
        if (response.success) {
          setIsOtp(true);
        } else {
          console.log(`error while sending otp to user email`);
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }

  function onClickHandlerSignin() {
    if (isOTP) {
      (async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/v1/user/login/verify-otp?email=${email}&otp=${otp}`
          );
          const response = res.data;
          if (response.success) {
            localStorage.setItem("token", `${response.data}`);
            setLoading(false);
            navigate("/");
            return;
          }
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      (async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            `${BACKEND_URL}/api/v1/user/login-pass`,
            {
              email,
              password,
            }
          );

          if (response.data.success) {
            localStorage.setItem("token", `${response.data.data}`);
            setLoading(false);
            navigate("/");
            return;
          }
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }

  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <TopBar label={"SIGN IN"} />
        <TopBarText text={"Enter the details to "} to={"signin"} />
        <InputComponent
          onChange={(e) => setEmail(e.target.value)}
          label={"Email"}
          value={email}
          placeholder={"johndoe@gmail.com"}
          isDisabled={isOTP}
        />
        {isOTP ? (
          <InputComponent
            onChange={(e) => setOtp(e.target.value)}
            placeholder={"OTP must be of 6 digits"}
            label={"OTP"}
            value={otp}
          />
        ) : (
          <InputComponent
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"***********"}
            value={password}
          />
        )}
        <div className="space-y-2 sm:mt-4 block">
          <ButtonComponent
            text={"Sign In"}
            onClickHandler={onClickHandlerSignin}
          />
          {isOTP ? null : (
            <div className="block">
              <ButtonComponent
                text={"SIGN IN WITH OTP"}
                onClickHandler={onClickHandlerOTP}
                type={"otp"}
              />
              <BottomTexts
                text={"Create Account?"}
                buttonText={"SIGN UP"}
                to={"/signup"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
