import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [userName, setUserName] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/v1/user/verify-user`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const response = await res.data;
          if (!response.success) {
            setErr(response.message);
          } else {
            setIsLoggedIn(true);
            setUserName(response.data.userName);
          }
        } catch (error) {
          setErr(error.message);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setErr(`You are not authenticated`);
      setLoading(false);
    }
  }, []);

  return { isLoggedIn, loading, err, userName };
}
