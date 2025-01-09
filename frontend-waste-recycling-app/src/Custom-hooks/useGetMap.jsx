import React, { useEffect, useRef, useState } from "react";
import useGetNearbyLocation from "./useGetNearbyLocation";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

export default function UseGetMap({ userCoords, isLoaded, error }) {
  // console.log(`reached into the useGetMap`);
  const navigate = useNavigate();
  const { data, errorMsg, loading } = useGetNearbyLocation(userCoords);
  const { lat, lng } = userCoords;
  const [destination, setDestination] = useState({ lat: null, lng: null });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);

  // Check for errors and render them
  useEffect(() => {
    if (destination.lat && destination.lng) {
      if (error) {
        setIsError(true);
        setErrorMessage(errorMsg);
      } else if (errorMsg) {
        setIsError(true);
        setErrorMessage(errorMsg);
      }
    }
  }, [destination, error, errorMsg]);

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

  // FUNCTION FOR INTIALISING THE MAP AND RENDERING THE MARKERS
  const initMap = () => {
    if (!window.google || !window.google.maps) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: lat || 0, lng: lng || 0 },
      zoom: 14,
    });

    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsRendererRef.current = directionsRenderer;

    // Store map instance for markers
    mapRef.current.mapInstance = map;

    // Add user's location marker
    addMarker(lat, lng, "You are here");

    // Add nearby recycling centers
    if (data) {
      renderNearbyLocation(data);
    }
  };

  useEffect(() => {
    // Ensure Google Maps API is loaded
    const interval = setInterval(() => {
      if (isLoaded && window.google && window.google.maps && mapRef && mapRef.current) {
        clearInterval(interval);
        initMap();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [mapRef, isLoaded, lat, lng]);

  useEffect(() => {
    if (destination.lat && destination.lng) {
      navigate(
        `/map-direction?originLat=${lat}&originLng=${lng}&destinationLat=${destination.lat}&destinationLng=${destination.lng}`
      );
    }
  }, [destination, navigate, lat, lng]);

  return (
    <div className="h-full">
      {loading || !isLoaded ? (
        <Spinner />
      ) : isError ? (
        <div className="h-full font-bold text-xl md:text-3xl lg:text-4xl text-red-700 font-serif">
          {errorMessage}
        </div>
      ) : (
        <div ref={mapRef} className="h-[100%] w-full"></div>
      )}
    </div>
  );
}
