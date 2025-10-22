import https from "https";

// City coordinates mapping
const cityCoordinates: { [key: string]: { lat: number; lon: number } } = {
  durban: { lat: -29.8587, lon: 31.0218 },
  pietermaritzburg: { lat: -29.6006, lon: 30.3794 },
  "cape town": { lat: -33.9249, lon: 18.4241 },
  johannesburg: { lat: -26.2041, lon: 28.0473 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
  london: { lat: 51.5074, lon: -0.1278 },
  "new york": { lat: 40.7128, lon: -74.006 },
};

function fetchWeather(city: string, callback: (err: Error | null, data?: any) => void) {
  const cityLower = city.toLowerCase();
  const coordinates = cityCoordinates[cityLower];

  if (!coordinates) {
    callback(
      new Error(
        `City '${city}' not found. Available cities: ${Object.keys(
          cityCoordinates
        ).join(", ")}`
      )
    );
    return;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m&current_weather=true`;
  https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const weatherData = JSON.parse(data);
        // Add city name to the response
        weatherData.city = city;
        callback(null, weatherData);
      });
    })
    .on("error", (err) => callback(err));
}

function fetchNews(callback: (err: Error | null, data?: any) => void) {
  const url = "https://dummyjson.com/posts";
  https
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => callback(null, JSON.parse(data)));
    })
    .on("error", (err) => callback(err));
}

fetchWeather("cape town", (weatherErr, weatherData) => {
  if (weatherErr) {
    console.error("Error fetching weather data:", weatherErr);
    return;
  }

  fetchNews((newsErr, newsData) => {
    if (newsErr) {
      console.error("Error fetching news data:", newsErr);
      return;
    }

    // Display weather data in a user-friendly format
    console.log(`\n=== Weather Data for ${weatherData.city} ===`);
    console.log(`Coordinates: ${weatherData.latitude}°, ${weatherData.longitude}°`
    );

    if (weatherData.current_weather) {
      console.log(`Current Temperature: ${weatherData.current_weather.temperature}°C`);
      console.log(`Wind Speed: ${weatherData.current_weather.windspeed} km/h`);
    }

    // Show first 5 hourly temperatures
    console.log(`\nNext 5 Hours Temperature Forecast:`);
    for (let i = 0; i < 5 && i < weatherData.hourly.time.length; i++) {
      const time = new Date(weatherData.hourly.time[i]).toLocaleTimeString();
      const temp = weatherData.hourly.temperature_2m[i];
      console.log(`  ${time}: ${temp}°C`);
    }

    // Display news data in a user-friendly format
    console.log(`\n=== Latest News Headlines ===`);
    newsData.posts.slice(0, 5).forEach((post: any, index: number) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`${post.body.substring(0, 100)}...`);
      console.log(
        `👍 ${post.reactions.likes} | 👎 ${post.reactions.dislikes} | 👁 ${post.views} views\n`
      );
    });
  });
});
