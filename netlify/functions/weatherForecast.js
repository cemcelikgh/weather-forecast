exports.handler = async (event) => {

  const baseUrl = 'https://api.tomorrow.io/v4/weather/forecast';
  const { city } = event.queryStringParameters;
  const apiKey = process.env.WEA_FOR_API_KEY;

  try {
    const response = await fetch(`${baseUrl}?location=${city}&timesteps=1d&units=metric&apikey=${apiKey}`);
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
