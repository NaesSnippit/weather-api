const apiKey = '12685ce1394210b54789163eb59730bc';

// Function to fetch weather data for a given city
async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to display current weather conditions
function displayCurrentWeather(data) {
    // Extract relevant information from the API response
    const city = data.city.name;
    const date = new Date(data.list[0].dt_txt);
    const icon = data.list[0].weather[0].icon;
    const temperature = data.list[0].main.temp;
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;

    // Update the current weather section in the dashboard
    const currentWeatherElement = document.getElementById('current-weather');
    currentWeatherElement.innerHTML = `
        <h2>${city} (${date.toLocaleDateString()})</h2>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

// Function to display the 5-day forecast
function displayForecast(data) {
    // Loop through the forecast data and create HTML elements for each day
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '<h2>5-Day Forecast:</h2>';
    for (let i = 0; i < data.list.length; i += 8) {
        const date = new Date(data.list[i].dt_txt);
        const icon = data.list[i].weather[0].icon;
      
