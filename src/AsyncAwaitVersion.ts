import axios from "axios";

async function fetchWeather() {
  const res = await axios.get(
    "https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m"
  );
  return res.data;
}

async function fetchNews() {
  const res = await axios.get("https://dummyjson.com/posts");
  return res.data.posts;
}

async function displayData() {
  try {
    const weather = await fetchWeather();
    const news = await fetchNews();

    console.log("Async/Await Weather:", weather);
    console.log("Async/Await News:", news.slice(0, 5));

    // Run simultaneously
    const [weather2, news2] = await Promise.all([fetchWeather(), fetchNews()]);
    console.log("Promise.all Async/Await Weather:", weather2);
    console.log("Promise.all Async/Await News:", news2.slice(0, 5));
  } catch (err) {
    console.error("Async/Await Error:", err);
  }
}

displayData();
