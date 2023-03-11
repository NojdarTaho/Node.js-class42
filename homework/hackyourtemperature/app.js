import express from "express";
import fetch from "isomorphic-fetch";
import keys from "./sources/keys.js";
const app = express();

// Body parser Middleware:
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from backend to frontend!!</h1>");
});

// Create a post route that has /weather as an endpoint:
app.post("/weather", async (req, res) => {
  try {
    const cityName = req.body.cityName;
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const jsonData = await data.json();
    const temperature = jsonData.main.temp;
    res.send({ City: cityName, Temperature: temperature });
  } catch {
    res.status(400).send({ weatherText: "City is not found!" });
  }
});

export default app;
