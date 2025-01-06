import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopbarComponent";
import { TopBarText } from "./TopBarTextComponent";
import { InputComponent } from "./InputBoxComponent";
import ButtonComponent from "./Button";
import axios from "axios";
import { BottomTexts } from "./BottomTextComponent";

export const Signup = ({ setLoading, isOtp, setIsOtp, email, setEmail }) => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  function onClickHandler() {
    if (isOtp) {
      // THEN OTP WALA CLICK-HANDLER KO CHALANA HAI
      (async () => {
        setLoading(true);
        try {
          if (otp === -1) {
            alert(`write the otp first`);
          }
          const response = await axios.get(
            `${BACKEND_URL}/api/v1/user/signup/verify-otp?email=${email}&otp=${otp}`
          );
          if (response.data.success) {
            localStorage.setItem("token", response.data.data);
            navigate("/main");
          } else {
            alert(response.message);
          }
        } catch (error) {
          console.log(error);
          alert(
            "Enter valid input. " + error.response?.data?.message ||
              error.message
          );
        } finally {
          setLoading(false);
        }
      })();
    } else {
      // THEN NORMAL WALA CLICK-HANDLER KO CHALANA HAI
      (async () => {
        const pattern = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        if (password.length < 8 || !pattern.test(password)) {
          setIsVisible(true);
          return;
        }
        if (isVisible) {
          setIsVisible(false);
        }
        setLoading(true);
        try {
          const response = await axios.post(
            `${BACKEND_URL}/api/v1/user/signup/send-otp?email=${email}`,
            {
              username: userName,
              password,
            }
          );
          if (response.data.success) {
            console.log(`isOtp is set properly`);
            setIsOtp((prev) => !prev);
          } else {
            alert("Signup failed, please check your inputs.");
          }
        } catch (error) {
          alert(
            "Enter valid input. " + error.response?.data?.message ||
              error.message
          );
        } finally {
          setLoading(false);
        }
      })();
    }
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <TopBar label={"SIGN UP"} />
        <TopBarText text={"Enter the details to "} to={"signup"} />
        <InputComponent
          onChange={(e) => setEmail(e.target.value)}
          label={"Email"}
          value={email}
          placeholder={"johndoe@gmail.com"}
          isDisabled={isOtp}
        />
        {isOtp ? (
          <InputComponent
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            label={"OTP"}
            placeholder={"OTP must be of 6 digits"}
          />
        ) : (
          <>
            <InputComponent
              onChange={(e) => setUsername(e.target.value)}
              label={"User Name"}
              value={userName}
              placeholder={"johndon01"}
            />
            {isVisible && (
              <div className="z-50 text-red-600">
                Password should contain at least one Uppercase, Lowercase,
                Special Characters, and Numbers, and be a minimum of 8 in
                length.
              </div>
            )}
            <InputComponent
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
              value={password}
              placeholder={"Johndon01@"}
            />
          </>
        )}
        <ButtonComponent
          onClickHandler={onClickHandler}
          text={isOtp ? "VERIFY OTP" : "SIGN UP"}
          type={isOtp ? "otp" : "signup"}
        />
        {isOtp ? null : (
          <BottomTexts
            text={"Already have an account?"}
            buttonText={"sign in"}
            to={"/signin"}
          />
        )}
      </div>
    </div>
  );
};
