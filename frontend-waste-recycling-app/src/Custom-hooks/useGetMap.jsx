import React, { useEffect, useRef, useState } from "react";
import useGetNearbyLocation from "./useGetNearbyLocation";
import useGetDistAndRoute from "./useGetDistAndRoute";
import Spinner from "../Components/Spinner";
import useLoadGomaps from "./useLoadGoMaps";

export default function UseGetMap({ userCoords }) {
  const { isLoaded, error } = useLoadGomaps();
  const { data, errorMsg, loading } = useGetNearbyLocation(userCoords);
  const { lat, lng } = userCoords;
  const [destination, setDestination] = useState(null);
  const [direction, setDirection] = useState(null);
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);

  if (errorMsg || error) {
    return alert(errorMsg);
  }

  if (destination) {
    const { response, errorMsg } = useGetDistAndRoute(userCoords, destination);
    if (response) {
      setDirection(response);
    } else if (errorMsg) {
      console.error(errorMsg);
    }
  }

  // Function to add a marker
  const addMarker = (markerLat, markerLng, title) => {
    const marker = new window.google.maps.Marker({
      position: { lat: markerLat, lng: markerLng },
      map: mapRef.current.mapInstance,
      title: title,
    });
    return marker;
  };

  // Function to fetch nearby recycling centers
  const renderNearbyLocation = (data) => {
    try {
      if (data.results && data.results.length > 0) {
        data.results.forEach((center) => {
          const marker = addMarker(
            center.geometry.location.lat,
            center.geometry.location.lng,
            center.name
          );
          // Add click listener to calculate distance or show info
          marker.addListener("click", () => {
            setDestination({
              lat: center.geometry.location.lat,
              lng: center.geometry.location.lng,
            });
          });
        });
      } else {
        alert("No recycling centers found nearby.");
      }
    } catch (error) {
      console.error("Error fetching recycling centers.", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: lat || 0, lng: lng || 0 },
        zoom: 14,
      });

      // Store map instance for markers
      mapRef.current.mapInstance = map;

      // Add user's location marker
      addMarker(lat, lng, "You are here");

      // Add nearby recycling centers
      if (data) {
        renderNearbyLocation(data);
      }
    };

    // Ensure Google Maps API is loaded
    if (isLoaded) {
      initMap();
    }
  }, [isLoaded, lat, lng, data]);

  useEffect(() => {
    if (direction && directionsRendererRef.current) {
      // Assuming directions is in the format required by the DirectionsRenderer
      directionsRendererRef.current.setDirections(direction);
    }
  }, [direction]);

  return (
    <div>
      {loading || !isLoaded ? (
        <Spinner />
      ) : (
        <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
      )}
    </div>
  );
}
