import ApiResponse from '../utils/api_response.js';

export const nearbyLocation = async (req, res) => {
  const { lat, lng } = req;
  // fetch the nearby recycling center from the current location of the user through the gomaps.pro api.
  const nearbyPlacesURL = `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?key=${process.env.API_KEY}&location=${lat},${lng}&rankby=distance&type=recycling&name=recycling&keyword=recycling&language=en`;

  try {
    const response = await fetch(nearbyPlacesURL);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, 'success', data.results));
    } else {
      //   showError('No recycling centers found nearby.');
      return res
        .status(404)
        .json(new ApiResponse(404, 'No recycling centers found nearby.', ''));
    }
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location access denied by the user.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorMessage = 'The request to get user location timed out.';
        break;
    }
    // showError(errorMessage);
    console.error('Geolocation Error:', errorMessage);
    return res.status(500).json(new ApiResponse(500, errorMessage, ''));
  }
};

export const calculateDistance = async (req, res) => {
  const { userLat, userLng, destination } = req;
  const distanceMatrixURL = `https://maps.gomaps.pro/maps/api/distancematrix/json?key=${process.env.API_KEY}&origins=${userLat},${userLng}&destinations=${destination.lat},${destination.lng}&mode=driving`;

  try {
    const response = await fetch(distanceMatrixURL);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data = await response.json();
    const element = data.rows[0]?.elements[0];

    if (element?.status === 'OK') {
      const distance = element.distance.text;
      const duration = element.duration.text;

      //await showRoute(userLat, userLng, destination);
      // send the message information to the frontened.
      return res
        .status(200)
        .json(new ApiResponse(200, 'success', { distance, duration }));
    } else {
      return res
        .status(502)
        .json(new ApiResponse(502, 'Unable to calculate distance.', ''));
    }
  } catch (error) {
    // showError('Error calculating distance.');
    console.log(`error while calculating distance: `);
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(500, 'Error calculating distance.', ''));
  }
};
