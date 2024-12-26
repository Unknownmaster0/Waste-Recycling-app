// This function will be used to verify the input for the nearby location API
export const verifyNearbyInput = async (req, res, next) => {
  let { lat, lng } = req.query;
  if (!lat || !lng)
    return res
      .status(400)
      .json({ message: 'Latitude and Longitude are required' });

  lat = parseFloat(lat);
  lng = parseFloat(lng);

  if (lat < -90 && lat > 90) {
    return res
      .status(400)
      .json({ message: 'Latitude should be between -90 and 90' });
  }

  if (lng < -180 && lng > 180) {
    return res
      .status(400)
      .json({ message: 'longitude should be between -180 and 180' });
  }

  req.lat = lat
  req.lng = lng

  next();
};
