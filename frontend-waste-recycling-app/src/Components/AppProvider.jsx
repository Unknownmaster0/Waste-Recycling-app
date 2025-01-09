import { useState } from "react";
import { UserContext } from "../Context/user.context";

export default function AppProvider({ children }) {
  const [userName, setUserName] = useState("");
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
