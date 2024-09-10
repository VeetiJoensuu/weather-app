GitHub Pages
https://veetijoensuu.github.io/weather_app/


Google Apps Script (GitHub Pages uses HTTPS and doesn't allow direct requests to OpenWeatherMap because of HTTP response)

function doGet(e) {
  const apiKey = '{my OpenWeatherMap API key}';
  const city = e.parameter.q;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());

  const result = {
    temperature: data.main.temp,
    description: data.weather[0].description,
    city: data.name,
    country: data.sys.country,
    timezone: data.timezone
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
