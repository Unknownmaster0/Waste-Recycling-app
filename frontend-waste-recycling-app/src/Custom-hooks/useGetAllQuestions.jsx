import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetAllQuestions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    if (!baseUrl) {
      setErr(new Error("Backend URL is missing."));
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/quiz/questions`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setLoading(false);
        setData(response.data.data || []);
      } catch (error) {
        console.log(`error while getting questions: ${error}`);
        setErr(error);
      }
    })();
  }, []);

  return { data, loading, err };
}
