import useGetLoggedIn from "../Custom-hooks/useGetLoggedIn";
import Spinner from "../Components/Spinner";
import Main from "../Components/Main";
import Layout from "../Components/Layout";

export default function MainPage() {
  const { isLoggedIn, loading, err, userName } = useGetLoggedIn();

  if (err) {
    alert(err);
    return;
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Layout
            userName={userName}
            isLoggedIn={isLoggedIn}
            children={<Main />}
          />
        </>
      )}
    </>
  );
}
