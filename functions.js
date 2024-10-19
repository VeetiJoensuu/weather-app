class City {
    constructor(name, country, wiki) {
      this.name = name;
      this.country = country;
      this.wiki = wiki;
    }
  }
  
  class WeatherData {
    constructor(city, temperature, description, timezone) {
      this.city = city;
      this.temperature = temperature;
      this.description = description;
      this.timezone = timezone;
    }
  
    getTemperatureCelsius() {
      return this.temperature - 273.15;
    }
  
    getLocalTimeAndDate() {
      const offSet = this.timezone / 3600;
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
  
    getTemperatureClass() {
      const tempCelsius = this.getTemperatureCelsius();
      if (tempCelsius > 30) {
        return 'temp-max';
      } else if (tempCelsius > 24) {
        return 'temp-high';
      } else if (tempCelsius > 15) {
        return 'temp-medium';
      } else if (tempCelsius > 0) {
        return 'temp-low';
      } else {
        return 'temp-min';
      }
    }
  }
  
  const cities = [
    new City('Oulu', 'Finland', 'https://en.wikipedia.org/wiki/Oulu'),
    new City('Helsinki', 'Finland', 'https://en.wikipedia.org/wiki/Helsinki'),
    new City('Gothenburg', 'Sweden', 'https://en.wikipedia.org/wiki/Gothenburg'),
    new City('London', 'United Kingdom', 'https://en.wikipedia.org/wiki/London'),
    new City('Vienna', 'Austria', 'https://en.wikipedia.org/wiki/Vienna'),
    new City('Madrid', 'Spain', 'https://en.wikipedia.org/wiki/Madrid'),
    new City('Istanbul', 'Turkey', 'https://en.wikipedia.org/wiki/Istanbul'),
    new City('Moscow', 'Russia', 'https://en.wikipedia.org/wiki/Moscow'),
    new City('New York', 'United States', 'https://en.wikipedia.org/wiki/New_York_City'),
    new City('San Francisco', 'United States', 'https://en.wikipedia.org/wiki/San_Francisco'),
    new City('Tokyo', 'Japan', 'https://en.wikipedia.org/wiki/Tokyo'),
    new City('Sydney', 'Australia', 'https://en.wikipedia.org/wiki/Sydney'),
    new City('Mexico City', 'Mexico', 'https://en.wikipedia.org/wiki/Mexico_City'),
    new City('Rio de Janeiro', 'Brazil', 'https://en.wikipedia.org/wiki/Rio_de_Janeiro'),
    new City('Nairobi', 'Kenya', 'https://en.wikipedia.org/wiki/Nairobi'),
    new City('Cape Town', 'South Africa', 'https://en.wikipedia.org/wiki/Cape_Town'),
    new City('Kuwait City', 'Kuwait', 'https://en.wikipedia.org/wiki/Kuwait_City'),
    new City('Timbuktu', 'Mali', 'https://en.wikipedia.org/wiki/Timbuktu'),
    new City('Chongqing', 'China', 'https://en.wikipedia.org/wiki/Chongqing'),
    new City('Bangkok', 'Thailand', 'https://en.wikipedia.org/wiki/Bangkok'),
    new City('Delhi', 'India', 'https://en.wikipedia.org/wiki/Delhi'),
    new City('Jakarta', 'Indonesia', 'https://en.wikipedia.org/wiki/Jakarta'),
    new City('Alice Springs', 'Australia', 'https://en.wikipedia.org/wiki/Alice_Springs'),
    new City('Reykjavik', 'Iceland', 'https://en.wikipedia.org/wiki/Reykjavik'),
    new City('Tromsø', 'Norway', 'https://en.wikipedia.org/wiki/Tromsø'),
    new City('Nuuk', 'Greenland', 'https://en.wikipedia.org/wiki/Nuuk'),
    new City('Yakutsk', 'Russia', 'https://en.wikipedia.org/wiki/Yakutsk'),
    new City('Noril\'sk', 'Russia', 'https://en.wikipedia.org/wiki/Norilsk'),
    new City('Anchorage', 'United States', 'https://en.wikipedia.org/wiki/Anchorage'),
    new City('Ushuaia', 'Argentina', 'https://en.wikipedia.org/wiki/Ushuaia')
  ];
  
  async function getWeatherData(city) {
    const url = `https://script.google.com/macros/s/AKfycbxBg9vVEBKWm4Peq8zpMJTevLE5o0SqRDXArFU0vRlZPZK4KXf1HY62Cqxp-nNl9gFq/exec?q=${city.name}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return new WeatherData(city.name, data.temperature, data.description, data.timezone);
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  }
  
  async function displayWeather() {
    const weatherData = await Promise.all(cities.map(city => getWeatherData(city)));
    weatherData.sort((a, b) => b.getTemperatureCelsius() - a.getTemperatureCelsius());
  
    const cityTableBody = document.querySelector('#city-table tbody');
    cityTableBody.innerHTML = weatherData.map(data => {
      if (!data || !data.city || !data.temperature || !data.description) {
        return `<tr><td colspan="4">Data not available</td></tr>`;
      }
      return `<tr>
        <td class="city-name ${data.getTemperatureClass()}">
          <a href="${cities.find(city => city.name === data.city).wiki}" target="_blank">${data.city}, ${cities.find(city => city.name === data.city).country}</a>
        </td>
        <td class="${data.getTemperatureClass()}">${data.getTemperatureCelsius().toFixed(2)}°C</td>
        <td class="description ${data.getTemperatureClass()}">${data.description}</td>
        <td class="vertical-line ${data.getTemperatureClass()}">${data.getLocalTimeAndDate()}</td>
      </tr>`;
    }).join('');
  }
  
  document.getElementById('cityInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      addCity();
    }
  });
  
  function addCity() {
    const cityName = document.getElementById('cityInput').value;
    if (cityName) {
      cities.push(new City(cityName, '(added by user)', `https://en.wikipedia.org/wiki/${cityName}`));
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