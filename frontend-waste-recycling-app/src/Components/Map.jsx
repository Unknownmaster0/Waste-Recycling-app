import UseGetMap from "../Custom-hooks/useGetMap";
import useGetUserLocation from "../Custom-hooks/useGetUserLocation";
import useLoadGomaps from "../Custom-hooks/useLoadGoMaps";

export default function Map() {
  console.log(`reached into the Map`);
  const { userCoords, locationError } = useGetUserLocation();
  const { isLoaded, error } = useLoadGomaps();

  return (
    <div className="h-screen">
      {locationError ? (
        <div className="h-full font-bold text-xl md:text-3xl lg:text-4xl text-red-700 font-serif">
          {locationError}
        </div>
      ) : userCoords.lat === null || userCoords.lng === null ? (
        <div className="font-bold text-xl md:text-3xl lg:text-4xl text-zinc-400 font-serif">
          Fetching location...
        </div>
      ) : (
        <UseGetMap userCoords={userCoords} isLoaded={isLoaded} error={error} />
      )}
    </div>
  );
}
