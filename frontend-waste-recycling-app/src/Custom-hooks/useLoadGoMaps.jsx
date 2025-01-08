import { useEffect, useState } from "react";

const useLoadGomaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(`reached into the useLoadGomaps`);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => setError("Failed to load gomaps.pro API");
      document.body.appendChild(script);
    };

    loadScript();
  }, [apiKey]);

  return { isLoaded, error };
};

export default useLoadGomaps;
