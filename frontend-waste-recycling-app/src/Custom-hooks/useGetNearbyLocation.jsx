import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetNearbyLocation({ lat, lng }) {
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/location/get-nearby-center?lat=${lat}&lng=${lng}`);
        const response = await res.data;
        if (response.success) {
          setData(response.data);
        } else {
          setErrorMsg(`API Error: ${response.message}`);
        }
      } catch (error) {
        setErrorMsg("Error fetching nearby recycling centers.");
      } finally{
        setLoading(false);
      }
    })();
  }, [lat, lng]);

  return { data, errorMsg , loading};
}
