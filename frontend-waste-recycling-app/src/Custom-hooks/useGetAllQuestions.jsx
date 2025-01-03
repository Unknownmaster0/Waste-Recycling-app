import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function useGetAllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    (async () => {
        try {
            const response = axios.get(`${baseUrl}/api/v1/quiz/questions`);
        } catch (error) {
            console.log(`error while getting questions: ${error}`);
            setErr(error);
        }
    })();
  }, []);

  return { questions, loading, err};
}
