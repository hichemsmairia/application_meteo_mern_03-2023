import axios from "axios";
export default async function getWeatherForCity(city) {
  let api_key = "7e6bb1426b6090c0571b94c216476c14";
  return await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
  );
}
