const cities = [
    { name: 'Oulu', country: 'Finland', wiki: 'https://en.wikipedia.org/wiki/Oulu' },
    { name: 'Helsinki', country: 'Finland', wiki: 'https://en.wikipedia.org/wiki/Helsinki' },
    { name: 'Gothenburg', country: 'Sweden', wiki: 'https://en.wikipedia.org/wiki/Gothenburg' },
    { name: 'London', country: 'United Kingdom', wiki: 'https://en.wikipedia.org/wiki/London' },
    { name: 'Vienna', country: 'Austria', wiki: 'https://en.wikipedia.org/wiki/Vienna' },
    { name: 'Madrid', country: 'Spain', wiki: 'https://en.wikipedia.org/wiki/Madrid' },
    { name: 'Istanbul', country: 'Turkey', wiki: 'https://en.wikipedia.org/wiki/Istanbul' },
    { name: 'Moscow', country: 'Russia', wiki: 'https://en.wikipedia.org/wiki/Moscow' },
    { name: 'New York', country: 'United States', wiki: 'https://en.wikipedia.org/wiki/New_York_City' },
    { name: 'San Francisco', country: 'United States', wiki: 'https://en.wikipedia.org/wiki/San_Francisco' },
    { name: 'Tokyo', country: 'Japan', wiki: 'https://en.wikipedia.org/wiki/Tokyo' },
    { name: 'Sydney', country: 'Australia', wiki: 'https://en.wikipedia.org/wiki/Sydney' },
    { name: 'Mexico City', country: 'Mexico', wiki: 'https://en.wikipedia.org/wiki/Mexico_City' },
    { name: 'Rio de Janeiro', country: 'Brazil', wiki: 'https://en.wikipedia.org/wiki/Rio_de_Janeiro' },
    { name: 'Nairobi', country: 'Kenya', wiki: 'https://en.wikipedia.org/wiki/Nairobi' },
    { name: 'Cape Town', country: 'South Africa', wiki: 'https://en.wikipedia.org/wiki/Cape_Town' },
    { name: 'Kuwait City', country: 'Kuwait', wiki: 'https://en.wikipedia.org/wiki/Kuwait_City' },
    { name: 'Timbuktu', country: 'Mali', wiki: 'https://en.wikipedia.org/wiki/Timbuktu' },
    { name: 'Chongqing', country: 'China', wiki: 'https://en.wikipedia.org/wiki/Chongqing' },
    { name: 'Bangkok', country: 'Thailand', wiki: 'https://en.wikipedia.org/wiki/Bangkok' },
    { name: 'Delhi', country: 'India', wiki: 'https://en.wikipedia.org/wiki/Delhi' },
    { name: 'Jakarta', country: 'Indonesia', wiki: 'https://en.wikipedia.org/wiki/Jakarta' },
    { name: 'Alice Springs', country: 'Australia', wiki: 'https://en.wikipedia.org/wiki/Alice_Springs' },
    { name: 'Reykjavik', country: 'Iceland', wiki: 'https://en.wikipedia.org/wiki/Reykjavik' },
    { name: 'Tromsø', country: 'Norway', wiki: 'https://en.wikipedia.org/wiki/Tromsø' },
    { name: 'Nuuk', country: 'Greenland', wiki: 'https://en.wikipedia.org/wiki/Nuuk' },
    { name: 'Yakutsk', country: 'Russia', wiki: 'https://en.wikipedia.org/wiki/Yakutsk' },
    { name: 'Noril\'sk', country: 'Russia', wiki: 'https://en.wikipedia.org/wiki/Norilsk' },
    { name: 'Anchorage', country: 'United States', wiki: 'https://en.wikipedia.org/wiki/Anchorage' },
    { name: 'Ushuaia', country: 'Argentina', wiki: 'https://en.wikipedia.org/wiki/Ushuaia' }
];
  
  async function getWeatherData(city) {
    const url = `https://script.google.com/macros/s/AKfycbxevclMn6KgSIRC7NJlqAYHb9rYOmM2h6_SfCypn7j5sgtGIOCiuPaZF5wtIcl2-8wI/exec?q=${city.name}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed:', error);
    }
  }
  
  function getLocalTimeAndDate(input) {
    const offSet = input / 3600;
    const date = new Date();
    date.setHours(date.getHours() + offSet - 3);

    const options = {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(date);
    const time = `${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}`;
    const weekday = parts.find(p => p.type === 'weekday').value;
    const formattedDate = `${parts.find(p => p.type === 'day').value}/${parts.find(p => p.type === 'month').value}/${parts.find(p => p.type === 'year').value}`;
    
    return `${time}, ${weekday} ${formattedDate}`;
}


  
  function getTemperatureClass(temp) {
    if (temp > 30) {
        return 'temp-max';
    } else if (temp > 24) {
        return 'temp-high';
    } else if (temp > 15) {
        return 'temp-medium';
    } else if (temp > 0) {
        return 'temp-low';
    } else {
        return 'temp-min';
    }
  }
  
  async function displayWeather() {
    const weatherData = await Promise.all(cities.map(city => getWeatherData(city)));
    weatherData.sort((a, b) => b.temperature - a.temperature);
  
    const cityTableBody = document.querySelector('#city-table tbody');
    cityTableBody.innerHTML = weatherData.map(data => {
        if (!data || !data.city || !data.temperature || !data.description) {
            return `<tr><td colspan="4">Data not available</td></tr>`;
        }
        const temperatureCelsius = data.temperature - 273.15;
        const localTimeAndDate = getLocalTimeAndDate(data.timezone);
        const tempClass = getTemperatureClass(temperatureCelsius);
        const city = cities.find(city => city.name === data.city);
  
        if (!city) {
            return `<tr><td colspan="4">City information not available</td></tr>`;
        }
  
        return `<tr>
                    <td class="city-name ${tempClass}">
                        <a href="${city.wiki}" target="_blank">${data.city}, ${city.country}</a>
                    </td>
                    <td class="${tempClass}">${temperatureCelsius.toFixed(2)}°C</td>
                    <td class="description ${tempClass}">${data.description}</td>
                    <td class="vertical-line ${tempClass}">${localTimeAndDate}</td>
                </tr>`;
    }).join('');
}

document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addCity();
    }
});

function addCity() {
    const cityName = document.getElementById('cityInput').value;
    if (cityName) {
        cities.push({ name: cityName, country: '(added by user)', wiki: `https://en.wikipedia.org/wiki/${cityName}` });
        console.log(cities);
        alert(`${cityName} has been added to the list.`);
        document.getElementById('cityInput').value = '';
    } else {
        alert('Please enter a city name.');
    }
    const timestamp = new Date().toLocaleString();
    console.log(`${timestamp} - Fetching weather data.`);
    displayWeather();
}
  
  function initialize() {
    const timestamp = new Date().toLocaleString();
    console.log(`${timestamp} - Fetching weather data.`);
    displayWeather();
  }
  initialize();

  function update() {
    const timestamp = new Date().toLocaleString();
    console.log(`${timestamp} - Fetching weather data.`);
    displayWeather();
  }
  // update every 1 minute (60 000 ms)
  setInterval(update, 60000);