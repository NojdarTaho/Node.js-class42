import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";
const app = express();

// Body parser Middleware:
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from backend to frontend!!</h1>");
});

// Create a post route that has /weather as an endpoint:
app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;

  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const jsonData = await data.json();
    const temperature = jsonData.main.temp;
    res.send({ city: cityName, temperature: temperature });
  } catch {
    res.status(400).send({ weatherText: `The city ${cityName} is not found!` });
  }
});

export default app;
