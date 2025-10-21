import axios from "axios";

function fetchWeather(): Promise<any> {
  return axios
    .get(
      "https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m"
    )
    .then((res) => res.data);
}

function fetchNews(): Promise<any> {
  return axios.get("https://dummyjson.com/posts").then((res) => res.data.posts);
}

// Chaining
fetchWeather()
  .then((weather) => {
    console.log("Weather:", weather);
    return fetchNews();
  })
  .then((news) => {
    console.log("News:", news.slice(0, 5));
  })
  .catch((err) => console.error("Error:", err));

// Promise.all()
Promise.all([fetchWeather(), fetchNews()]).then(([weather, news]) => {
  console.log("Promise.all Weather:", weather);
  console.log("Promise.all News:", news.slice(0, 5));
});

// Promise.race()
Promise.race([fetchWeather(), fetchNews()]).then((result) => {
  console.log("Promise.race first resolved:", result);
});
