import React, { useEffect, useRef, useState } from "react";
import useGetNearbyLocation from "./useGetNearbyLocation";
import useGetDistAndRoute from "./useGetDistAndRoute";
import Spinner from "../Components/Spinner";

export default function UseGetMap({ userCoords, isLoaded, error }) {
  // console.log(`reached into the useGetMap`);
  const { data, errorMsg, loading } = useGetNearbyLocation(userCoords);
  const { lat, lng } = userCoords;
  const [destination, setDestination] = useState({ lat: null, lng: null });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const { response, errorMsg: err } = useGetDistAndRoute(
    userCoords,
    destination
  );

  useEffect(() => {
    if (response && directionsRendererRef.current) {
      // Check if routes exist
      if (
        !response.data ||
        !response.data.routes ||
        response.data.routes.length === 0
      ) {
        console.error("No routes found in the response");
        return; // Exit if no routes are found
      }

      const directionsResult = {
        routes: response.data.routes.map((route) => ({
          legs: route.legs.map((leg) => ({
            distance: leg.distance,
            duration: leg.duration,
            start_address: leg.start_address,
            end_address: leg.end_address,
            start_location: leg.start_location,
            end_location: leg.end_location,
            steps: leg.steps.map((step) => ({
              distance: step.distance,
              duration: step.duration,
              start_location: step.start_location,
              end_location: step.end_location,
              travel_mode: step.travel_mode,
              instructions: step.html_instructions,
              polyline: step.polyline.points, // This is the encoded polyline
            })),
          })),
          overview_polyline: route.overview_polyline.points, // This is the encoded polyline for the entire route
          summary: route.summary,
        })),
        status: response.data.status,
      };

      // Set the directions to the DirectionsRenderer
      directionsRendererRef.current.setDirections(directionsResult);
    }
  }, [response]);

  // Check for errors and render them
  useEffect(() => {
    if (destination.lat && destination.lng) {
      if (error) {
        setIsError(true);
        setErrorMessage(errorMsg);
      } else if (err) {
        setIsError(true);
        setErrorMessage(err);
      } else if (errorMsg) {
        setIsError(true);
        setErrorMessage(errorMsg);
      }
    }
  }, [destination, error, err, errorMsg]);

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

  const initMap = () => {
    if (!window.google || !window.google.maps) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: lat || 0, lng: lng || 0 },
      zoom: 14,
    });

    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsRendererRef.current = directionsRenderer; // Store the reference

    // Store map instance for markers
    mapRef.current.mapInstance = map;

    // Add user's location marker
    addMarker(lat, lng, "You are here");

    // Add nearby recycling centers
    if (data) {
      renderNearbyLocation(data);
    } else {
      const interval = setInterval(() => {
        if (data) {
          clearInterval(interval);
          renderNearbyLocation(data);
        }
      }, 100);
    }
  };

  useEffect(() => {
    // Ensure Google Maps API is loaded
    if (isLoaded && mapRef.current) {
      initMap();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
    }
  }, [mapRef, isLoaded, lat, lng, data]);

  return (
    <div className="h-full">
      {loading || !isLoaded ? (
        <Spinner />
      ) : isError ? (
        <div className="h-full font-bold text-xl md:text-3xl lg:text-4xl text-red-700 font-serif">
          {errorMessage}
        </div>
      ) : (
        <div ref={mapRef} className="h-[80%] w-full"></div>
      )}
    </div>
  );
}
