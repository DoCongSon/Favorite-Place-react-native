const GOOGLE_API_KEY = 'AIzaSyCO6u5qRaaaL9rOMboqujPI_ZJcF4Xomi0';

const getMapPreviews = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=500x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
};

const getAddress = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=vi&key=${GOOGLE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const address = data.results[4].formatted_address;
    return address;
  } catch (error) {
    throw new Error('Failed to fetch address');
  }
};

export { getMapPreviews, getAddress };
