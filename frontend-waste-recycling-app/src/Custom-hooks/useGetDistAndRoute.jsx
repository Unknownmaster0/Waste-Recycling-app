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
        const responseData = await axios.get(reqUrl, bodyData);
        if (responseData.status === 200) {
          setResponse(responseData.data);
        } else {
          setErrorMsg(`API Error: ${responseData.statusText}`);
        }
      } catch (error) {
        setErrorMsg("Error fetching distance and route.");
      }
    })();
  }, [source, destination]);

  return { response, errorMsg };
}
