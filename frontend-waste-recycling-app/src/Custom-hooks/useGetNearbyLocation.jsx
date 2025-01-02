import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetNearbyLocation({ lat, lng }) {
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async function () {
      const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your actual API key
      const nearbyPlacesURL = `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?key=${API_KEY}&location=${lat},${lng}&rankby=distance&type=recycling&name=recycling&keyword=recycling&language=en`;

      try {
        const responseData = await axios.get(nearbyPlacesURL);
        
        if (responseData.status === 200 && responseData.data.status === "OK") {
          setData(responseData.data);
        } else {
          setErrorMsg(`API Error: ${responseData.statusText}`);
        }
      } catch (error) {
        setErrorMsg("Error fetching nearby recycling centers.");
      }
    })();
  }, [lat, lng]);

  return { data, errorMsg };
}
