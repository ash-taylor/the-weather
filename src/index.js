import "./styles/style.css";

async function getWeather(location) {
  try {
    const apiResult = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=78da233aa38148169f9141126230905&q=${location}`,
      { mode: "cors" }
    );
    return await apiResult.json();
  } catch (error) {
    return error;
  }
}

function weatherResult(weatherData) {
  const weatherUpdate = document.querySelector(".weather-update");
  const weatherIcon = document.querySelector(".weather-icon");

  weatherIcon.src = `http:${weatherData.current.condition.icon}`;
  weatherIcon.alt = "Weather Icon";

  weatherUpdate.innerText = `It is ${weatherData.current.condition.text.toLowerCase()} with a temperature of ${
    weatherData.current.temp_c
  } degrees in ${weatherData.location.name}.`;
}

async function updateWeather(location) {
  try {
    const weatherData = await getWeather(location);
    if (!weatherData.error) {
      weatherResult(weatherData);
    }
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("location-search").addEventListener("change", (e) => {
  if (e.target.value) {
    updateWeather(e.target.value.replace(/\s/g, "").toLowerCase());
  }
});
