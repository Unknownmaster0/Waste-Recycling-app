import { useState } from "react";
import Spinner from "../Components/Spinner";
import { AppBar } from "../Components/AppBarComponent";
import { Signin } from "../Components/Signin";
import { AppPromotion } from "../Components/AppPromotionComponent";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [isOTP, setIsOtp] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-screen flex flex-col">
          <div>
            <AppBar />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 flex-grow">
            <div className="flex items-center justify-center h-full">
              <Signin
                setLoading={setLoading}
                setIsOtp={setIsOtp}
                isOTP={isOTP}
                email={email}
                setEmail={setEmail}
              />
            </div>
            <div className="hidden sm:flex items-center justify-center bg-green-200 h-full">
              <AppPromotion />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
