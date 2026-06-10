const baseUrl = 'https://api.tomtom.com/search/2/reverseGeocode';
const apiKey = process.env.REV_GEO_API_KEY;

exports.handler = async (event) => {

  const lat = event.queryStringParameters?.lat;
  const lon = event.queryStringParameters?.lon;

  if (lat == null || lon == null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'lat and lon are required' })
    };
  };

  if (!apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing API key' })
    };
  };

  try {
  
    const response = await fetch(`${baseUrl}/${lat},${lon}.json?key=${apiKey}`);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'External API request failed' })
      };
    };
    
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };

  };

};
