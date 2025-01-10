import UseGetMap from "./useGetMap";
import useGetNearbyLocation from "../Custom-hooks/useGetNearbyLocation";
import useGetUserLocation from "../Custom-hooks/useGetUserLocation";
import useLoadGomaps from "../Custom-hooks/useLoadGoMaps";
import Spinner from "./Spinner";

export default function Map() {
  // console.log(`reached into the Map`);
  const { userCoords, locationError } = useGetUserLocation();
  const { data, errorMsg, loading } = useGetNearbyLocation(userCoords);
  const { isLoaded, error } = useLoadGomaps();

  return (
    <div className="h-screen">
      {locationError || errorMsg || error ? (
        <div className="h-full font-bold text-xl md:text-3xl lg:text-4xl text-red-700 font-serif">
          {locationError || errorMsg || error}
        </div>
      ) : userCoords.lat === null || userCoords.lng === null ? (
        <div className="font-bold text-xl md:text-3xl lg:text-4xl text-zinc-400 font-serif">
          Fetching location...
        </div>
      ) : loading || !isLoaded ? (
        <Spinner />
      ) : (
        <UseGetMap userCoords={userCoords} data={data} />
      )}
    </div>
  );
}
