exports.handler = async (event) => {

  const baseUrl = 'https://api.tomtom.com/search/2/reverseGeocode';
  const { lat, lon } = event.queryStringParameters;
  const apiKey = process.env.REV_GEO_API_KEY;

  try {
    const response = await fetch(`${baseUrl}/${lat},${lon}.json?key=${apiKey}`);
    const data = await response.json();
    return {
      statusCode:200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  };

};
