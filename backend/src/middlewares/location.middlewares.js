import ApiResponse from '../utils/api_response.js';
import decodePolyline from '../utils/decodePolyline.google.map.js';

// This function will be used to verify the input for the nearby location API
export const verifyNearbyInput = async (req, res, next) => {
  let { lat, lng } = req.query;
  if (!lat || !lng)
    return res
      .status(400)
      .json({ message: 'Latitude and Longitude are required' });

  lat = parseFloat(lat);
  lng = parseFloat(lng);

  if (lat < -90 || lat > 90) {
    return res
      .status(400)
      .json({ message: 'Latitude should be between -90 and 90' });
  }

  if (lng < -180 || lng > 180) {
    return res
      .status(400)
      .json({ message: 'longitude should be between -180 and 180' });
  }

  req.lat = lat;
  req.lng = lng;

  next();
};

export const validateCalcdist = async (req, res, next) => {
  const { lat, lng } = req.query;
  const destination = req.body;

  if (!lat || !lng || !destination || !destination.lat || !destination.lng)
    return res.status(400).json(new ApiResponse(400, 'Invalid input', ''));

  next();
};

export const calcDistMiddleware = async (req, res, next) => {
  const { lat: userLat, lng: userLng } = req.query;
  const destination = req.body;
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
      req.distance = distance;
      req.duration = duration;
      next();
    } else {
      return res
        .status(502)
        .json(new ApiResponse(502, 'Unable to calculate distance.', ''));
    }
  } catch (error) {
    console.log(`error while calculating distance: `);
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(500, 'Error calculating distance.', ''));
  }
};

export const getRouteMiddleware = async (req, res, next) => {
  const { lat: userLat, lng: userLng } = req.query;
  const destination = req.body;
  const directionsURL = `https://maps.gomaps.pro/maps/api/directions/json?key=${process.env.API_KEY}&origin=${userLat},${userLng}&destination=${destination.lat},${destination.lng}&mode=driving`;

  try {
    const response = await fetch(directionsURL);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data = await response.json();
    const route = data.routes[0]?.overview_polyline?.points;

    if (route) {
      const decodedPath = decodePolyline(route);
      req.decodedPath = decodedPath;
      next();
      // ==== the below thing must be done in the frontend, so that to keep track of the map that has been the global map =====
      //   const routePath = new google.maps.Polyline({
      //     path: decodedPath,
      //     geodesic: true,
      //     strokeColor: '#FF0000',
      //     strokeOpacity: 1.0,
      //     strokeWeight: 2,
      //   });
      //   routePath.setMap(map);
    } else {
      console.log('No route available in route middleware');
      return res
        .status(404)
        .json(
          new ApiResponse(
            500,
            'error while fetching route in route middleware',
            ''
          )
        );
    }
  } catch (error) {
    console.log('Error fetching route in route middleware');
    console.error(error);
    return res
      .status(404)
      .json(
        new ApiResponse(
          500,
          'error while fetching route in route middleware',
          ''
        )
      );
  }
};
