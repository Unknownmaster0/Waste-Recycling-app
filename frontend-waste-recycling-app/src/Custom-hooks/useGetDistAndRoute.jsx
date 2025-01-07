import axios from "axios";
import { useState } from "react";
export default function useGetDistAndRoute(source, destination) {
  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const reqUrl = `${baseUrl}/api/v1/location/get-direction?lat=${source.lat}&lng=${source.lng}`;

  const bodyData = {
    destination: {
      lat: destination.lat,
      lng: destination.lng,
    },
  };

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(reqUrl, bodyData);
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
  }, [source, destination]);

  return { response, errorMsg };
}
