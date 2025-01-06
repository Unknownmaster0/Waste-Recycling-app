import { useState } from "react";
import Spinner from "../Components/Spinner";
import { AppBar } from "../Components/AppBarComponent";
import { AppPromotion } from "../Components/AppPromotionComponent";
import { Signup } from "../Components/Signup";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div className="h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col h-full">
          <div>
            <AppBar />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 flex-grow">
            <div className="flex items-center justify-center h-full">
              <Signup
                setLoading={setLoading}
                isOtp={isOtp}
                setIsOtp={setIsOtp}
                email={email}
                setEmail={setEmail}
              />
            </div>
            <div className="hidden sm:flex items-center justify-center bg-green-200  h-full">
              <AppPromotion />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
