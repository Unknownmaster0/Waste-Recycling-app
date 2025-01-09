import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function MapWithDirection() {
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const [queryParams] = useSearchParams();
  const originLat = queryParams.get("originLat");
  const originLng = queryParams.get("originLng");
  const destinationLat = queryParams.get("destinationLat");
  const destinationLng = queryParams.get("destinationLng");

  const origin = {
    lat: parseFloat(originLat),
    lng: parseFloat(originLng),
  };

  const destination = {
    lat: parseFloat(destinationLat),
    lng: parseFloat(destinationLng),
  };

  useEffect(() => {
    // Load Google Maps Script dynamically
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.body.appendChild(script);
    } else {
      initializeMap();
    }
  }, [origin, destination]);

  const initializeMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: origin.lat, lng: origin.lng },
      zoom: 7,
    });

    // Initialize DirectionsRenderer and attach to the map
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsRendererRef.current = directionsRenderer;

    // Fetch and render directions
    fetchDirections(origin, destination);
  };

  const fetchDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(
          destination.lat,
          destination.lng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING, // Change as needed
      },
      (result, status) => {
        if (status === "OK") {
          directionsRendererRef.current.setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

  return (
    <div className="h-screen">
      <div ref={mapRef} className="h-[100%] w-full" />
    </div>
  );
}

export default MapWithDirection;
