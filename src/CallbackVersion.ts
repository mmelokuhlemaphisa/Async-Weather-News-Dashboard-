import https from "https";

function fetchWeather(
  city: string,
  callback: (err: Error | null, data?: any) => void
) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m`;
  https
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => callback(null, JSON.parse(data)));
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



fetchWeather("durban", (weatherErr, weatherData) => {
  if (weatherErr) {
    console.error("Error fetching weather data:", weatherErr);
    return;
  }

  fetchNews((newsErr, newsData) => {
    if (newsErr) {
      console.error("Error fetching news data:", newsErr);
      return;
    }
    console.log("Weather Data:", weatherData);
    console.log("News Data:", newsData.posts.slice(0, 5));
  });
});