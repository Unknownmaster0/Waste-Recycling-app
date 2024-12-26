export default function addMarker(lat, lng, title) {
  return new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: title,
  });
}
