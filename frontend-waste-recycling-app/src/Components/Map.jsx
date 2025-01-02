import UseGetMap from "../Custom-hooks/useGetMap";
import useGetUserLocation from "../Custom-hooks/useGetUserLocation";

export default function Map() {
  const { userCoords, locationError } = useGetUserLocation();

  if (locationError !== null) {
    return (
      <>
        <div className="font-bold text-4xl">{locationError}</div>
      </>
    );
  }

  if (userCoords.lat === null || userCoords.lng === null) {
    return <div className="font-bold text-4xl">Fetching location...</div>;
  }

  return (
    <>
      <UseGetMap userCoords={userCoords} />
    </>
  );
}
