import React, { useEffect, useRef } from "react";
import useGetNearbyLocation from "./useGetNearbyLocation";

export default function UseGetMap({ userCoords }) {
  const { data, errorMsg } = useGetNearbyLocation(userCoords);
  const { lat, lng } = userCoords;
  const mapRef = useRef(null);

  if (errorMsg !== null) {
    console.log(`found here`);
    return <div className="font-4xl text-red-800">{errorMsg}</div>;
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
          marker.addListener("click", () =>
            // then we need to set the center of the map to that location.
            alert(
              `Center: ${center.name}\nLocation: (${center.geometry.location.lat}, ${center.geometry.location.lng})`
            )
          );
        });
      } else {
        console.error("No recycling centers found nearby.");
      }
    } catch (error) {
      console.error("Error fetching recycling centers.", error);
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
    if (window.google && window.google.maps) {
      initMap();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
    }
  }, [lat, lng, data]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>;
}
