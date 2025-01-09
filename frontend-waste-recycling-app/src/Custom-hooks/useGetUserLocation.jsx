import { useEffect, useState } from "react";

async function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default function useGetUserLocation() {
  // console.log(`reached into the useGetUserLocation`);
  const [userCoords, setUserCoords] = useState({ lat: null, lng: null });
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    (async function () {
      if (navigator.geolocation) {
        try {
          const position = await getUserLocation();
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserCoords({ lat: userLat, lng: userLng });
        } catch (error) {
          switch (error.code) {
            case 1:
              console.log("Permission denied by user.");
              setLocationError("Permission denied by user.");
              break;
            case 2:
              console.log("Position unavailable.");
              setLocationError("Position unavailable.");
              break;
            case 3:
              console.log("Timeout occurred while fetching location.");
              setLocationError("Timeout occurred while fetching location.");
              break;
            default:
              console.log("Unknown error occurred.");
              setLocationError("Unknown error occurred.");
          }
        }
      }
    })();
  }, []);

  return { userCoords, locationError };
}
