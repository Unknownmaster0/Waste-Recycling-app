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
      return res.status(200).json(new ApiResponse(200, 'success', data));
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
    return res.status(500).json(new ApiResponse(500, errorMessage, ''));
  }
};

export const getDistAndRoute = async (req, res) => {
  // get the distance and route from the user location to the destination location.
  // distance, duration and route are the object of the req object, get them and return as response.
  return res.status(200).json(
    new ApiResponse(200, 'success', {
      distance: req.distance,
      duration: req.duration,
      route: req.route,
    })
  );
};
