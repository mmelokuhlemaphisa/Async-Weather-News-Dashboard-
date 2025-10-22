import axios from "axios";



// Chainingimport axios from "axios";

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

function fetchWeather(city: string): Promise<any> {
  const cityLower = city.toLowerCase();
  const coordinates = cityCoordinates[cityLower];

  if (!coordinates) {
    return Promise.reject(
      new Error(
        `City '${city}' not found. Available cities: ${Object.keys(
          cityCoordinates
        ).join(", ")}`
      )
    );
  }

  return axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m&current_weather=true`
    )
    .then((res) => {
      const weatherData = res.data;
      weatherData.city = city;
      return weatherData;
    });
}

function fetchNews(): Promise<any> {

  return axios.get("https://dummyjson.com/posts").then((res) => res.data.posts);
}

// Helper function to format weather data
function displayWeatherData(weather: any): void {
  console.log(`\n=== Weather Data for ${weather.city} ===`);
  console.log(`Coordinates: ${weather.latitude}°, ${weather.longitude}°`);

  if (weather.current_weather) {
    console.log(
      `Current Temperature: ${weather.current_weather.temperature}°C`
    );
    console.log(`Wind Speed: ${weather.current_weather.windspeed} km/h`);
  }

  console.log(`\nNext 5 Hours Temperature Forecast:`);
  for (let i = 0; i < 5 && i < weather.hourly.time.length; i++) {
    const time = new Date(weather.hourly.time[i]).toLocaleTimeString();
    const temp = weather.hourly.temperature_2m[i];
    console.log(`  ${time}: ${temp}°C`);
  }
}

// Helper function to format news data
function displayNewsData(news: any[]): void {
  console.log(`\n=== Latest News Headlines ===`);
  news.slice(0, 5).forEach((post: any, index: number) => {
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   ${post.body.substring(0, 100)}...`);
    console.log(
      `   👍 ${post.reactions.likes} | 👎 ${post.reactions.dislikes} | 👁 ${post.views} views\n`
    );
  });
}


// Chaining - Sequential execution
fetchWeather("johannesburg")
  .then((weather) => {
    displayWeatherData(weather);
    return fetchNews();
  })
  .then((news) => {
    displayNewsData(news);
  })
  .catch((err) => console.error("Chaining Error:", err.message));


// Promise.all() - Parallel execution
Promise.all([fetchWeather("cape town"), fetchNews()])
  .then(([weather, news]) => {
    console.log("\n--- Promise.all() Results (Parallel Execution) ---");
    displayWeatherData(weather);
    displayNewsData(news);
  })
  .catch((err) => console.error("Promise.all Error:", err.message));


// Promise.race() - First to resolve wins
Promise.race([fetchWeather("durban"), fetchNews()])
  .then((result) => {
    console.log("\n--- Promise.race() Results (First to resolve) ---");
    if (result.city) {
      // It's weather data
      displayWeatherData(result);
    } else if (Array.isArray(result)) {
      // It's news data
      displayNewsData(result);
    } else {
      console.log("Promise.race result:", result);
    }
  })
  .catch((err) => console.error("Promise.race Error:", err.message));


