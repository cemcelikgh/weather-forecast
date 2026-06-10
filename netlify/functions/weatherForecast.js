const baseUrl = 'https://api.tomorrow.io/v4/weather/forecast';
const apiKey = process.env.WEA_FOR_API_KEY;

exports.handler = async (event) => {

  const city = event.queryStringParameters?.city;

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'city is required' })
    };
  };

  if (!apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing API key' })
    };
  };

  try {
  
    const response = await fetch(`${baseUrl}?location=${city}&timesteps=1d&units=metric&apikey=${apiKey}`,
      {
        method: 'GET',
        headers: { accept: 'application/json', 'accept-encoding': 'deflate, gzip, br' }
      }
    );

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
