import axios from "axios";
import { useEffect, useState } from "react";
export default function useGetDistAndRoute(source, destination) {
  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const reqUrl = `${baseUrl}/api/v1/location/get-direction?lat=${source.lat}&lng=${source.lng}`;
    const bodyData = {
      lat: destination?.lat,
      lng: destination?.lng,
    };
    if (!destination.lat || !destination.lng) {
      setResponse(null);
      setErrorMsg(null);
      return;
    } else {
      (async function () {
        try {
          const res = await axios.post(reqUrl, bodyData);
          const response = await res.data;
          if (response.success) {
            setResponse(response.data);
          } else {
            setErrorMsg(`API Error: ${response.message}`);
          }
        } catch (error) {
          setErrorMsg("Error fetching distance and route.");
        }
      })();
    }
  }, [source, destination, baseUrl]);

  return { response, errorMsg };
}
