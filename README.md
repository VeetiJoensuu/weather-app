GitHub Pages
https://veetijoensuu.github.io/weather_app/


Google Apps Script (It is good practice to hide your API keys, which was difficult to do on a static GitHub pages site)

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

Background image is free for use under the Pixabay Content License:
https://pixabay.com/service/license-summary/

__________________________________________________________________________
WEB-SOVELLUSTEN PERUSTEET (5 OP) arviointikriteerit

HTML 1/5:  index.html (lines 1-9, 33-34)
HTML 2/5:  index.html (lines 10-31)
HTML 3/5:  index.html (lines 14-16)
HTML 4/5:  index.html (lines 17-27)
HTML 5/5:  index.html (lines 10, 12, 13, 28, 29, 31)


CSS 1/5:  style.css (lines 2, 11)
CSS 2/5:  style.css (lines 38, 43, 48, 53, 58)
CSS 3/5:  -
CSS 4/5:  -
CSS 5/5:  style.css


Javascript Basics 1/5:
functions.js (lines 115-119: waiting for the user to press Enter,
lines 121-134: alert is used)

Javascript Basics 2/5:
functions.js (lines 115-119: listening for Enter key press,
line 149: updating weather data every minute,
lines 121-134: adding a city and updating UI)

Javascript Basics 3/5:
functions.js (lines 1-32: array and objects, lines 34-147 functions)

Javascript Basics 4/5:
functions.js (line 88: sorting weather data based on temperature,
line 87: looping through the cities array to fetch weather data,
lines 121-134: adding a new city to the list and dynamically updating the display)

Javascript Basics 5/5: -


Asynchronous Operations 1/5:
functions.js (line 149: timer to update data)

Asynchronous Operations 2/5:
functions.js (lines 34-46: fetching weather data from my Google Apps Script, that fetches weather data from OpenWeather API)

Asynchronous Operations 3/5:
functions.js (lines 86-113: displayWeather() fetches data for all cities, sorts by temperature, updates the DOM)

Asynchronous Operations 4/5:
functions.js (lines 36-45: try-catch block with error logging)

Asynchronous Operations 5/5:
functions.js (line 88: sorting weather data by temperature before displaying it,
lines 72-84: categorizing weather data by temperature, setting different colours for different temperature ranges)