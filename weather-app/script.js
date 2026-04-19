const apiKey = "abcd1234efgh5678ijkl9012mnop3456";  // Use your API key here
const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const tempText = document.querySelector("#weatherDetailsContainer>.temperature-details h1");
const cityText = document.querySelector("#weatherDetailsContainer>.temperature-details h2");
const HumidityText = document.querySelector("#weatherDetailsContainer .bottom-info .humidity h3");
const WindText = document.querySelector("#weatherDetailsContainer .bottom-info .wind h3");

const searchInput = document.querySelector(".search-panel input");
const searchIcon = document.querySelector(".search-panel .search-icon");

async function getWeatherData(city) {
  try {
    const response = await fetch(`${apiURL}?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === 200) {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      // Fill the UI elements
      tempText.textContent = `${temperature}°C`;
      cityText.textContent = data.name; // API returns the proper city name
      HumidityText.textContent = `${humidity}%`;
      WindText.textContent = `${windSpeed} km/h`;
    } else {
      console.log(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// ✅ Trigger when user presses Enter
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }
});

// ✅ Trigger when user clicks the search icon
searchIcon.addEventListener("click", function () {
  const city = searchInput.value.trim();
  if (city) {
    getWeatherData(city);
  }
});


