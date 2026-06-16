const apiKey = "63d22aef781f4802be4145127261606";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        document.getElementById("city").textContent =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById("temp").textContent =
            `${data.current.temp_c}°C`;

        document.getElementById("condition").textContent =
            data.current.condition.text;

        document.getElementById("wind").textContent =
            data.current.wind_kph;

        document.getElementById("humidity").textContent =
            data.current.humidity;

        document.getElementById("feelsLike").textContent =
            data.current.feelslike_c;

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        weatherCard.style.display = "block";

    } catch (error) {
        console.error(error);
        alert("Error fetching weather data.");
    }
}