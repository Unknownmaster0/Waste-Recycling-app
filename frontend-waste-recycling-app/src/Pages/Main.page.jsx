import useGetLoggedIn from "../Custom-hooks/useGetLoggedIn";
import Spinner from "../Components/Spinner";
import Main from "../Components/Main";
import Layout from "../Components/Layout";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/user.context";

export default function MainPage() {
  const { isLoggedIn, loading, err, userName } = useGetLoggedIn();
  const { setUserName } = useContext(UserContext);

  useEffect(() => {
    setUserName(userName);
  }, [isLoggedIn, userName]);
  
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Layout children={<Main />} />
        </>
      )}
    </>
  );
}
