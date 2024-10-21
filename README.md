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

_______________________________________________________________________________________________________________
WEB-SOVELLUSTEN PERUSTEET (5 OP) arviointikriteerit

HTML (25%)
1. **Basic HTML structure is present**:
   - index.html (lines 1-10, 34-35)

2. **HTML structure with clear content differentiation (headings, paragraphs, lists)**:
   - index.html (lines 11-32)

3. **Use of forms, links, and media**:
   - index.html (lines 15-17)

4. **Tables are effectively used**:
   - index.html (lines 18-28)

5. **Consistent use of semantic HTML throughout, ensuring better structure and understanding of the content**:
   - index.html (lines 11, 13, 14, 29, 30, 32)

CSS (25%)
1. **Basic CSS styling (colors, fonts)**:
   - style.css (lines 2, 11)**:

2. **Use of classes and IDs to style specific elements**:
   - style.css (lines 38, 43, 48, 53, 58)

3. **Implementation of responsive design elements**:
   - style.css (lines 107-117)

4. **Use of layouts for advanced user interfaces (arrays, float, flexbox, css grid)**:
   - style.css (lines 119-136)

5. **Styling demonstrates a strong grasp of layout principles, aesthetics, and user experience**:
   - style.css


JavaScript Basics (25%)
1. **Simple interactions (like alerts on button click)**:
   - functions.js (lines 135, 138): alert is used.

2. **Multiple event listeners and basic DOM manipulations**:
   - functions.js (lines 153-160): updating weather data every minute.
   - functions.js (lines 130-143): adding a city and updating UI.

3. **Use of arrays, objects, and functions**:
   - functions.js (lines 57-88): array and objects.
   - functions.js: various functions.

4. **Advanced logic, looping through data, and dynamic DOM updates**:
   - functions.js (line 105): looping through the cities array to fetch weather data.
   - functions.js (line 106): sorting weather data based on temperature.
   - functions.js (lines 130-143): adding a new city to the list and dynamically updating the display.

5. **Consistent use of Object-Oriented JavaScript principles**:
   - functions.js (lines 1, 9): classes defined
   - functions.js (lines 58-87, 98): class objects being created 

Asynchronous Operations (25%)
1. **Use of timers**:
   - functions.js (line 160): timer to update data.

2. **Successful implementation of an AJAX call or Fetch**:
   - functions.js (lines 90-102): fetching weather data from my Google Apps Script, which fetches weather data from OpenWeather API.

3. **Data from the asynchronous call is displayed on the webpage**:
   - functions.js (lines 104-122): displayWeather() fetches data for all cities, sorts by temperature, updates the DOM.

4. **Error handling is implemented (for failed API calls, etc.)**:
   - functions.js (lines 92-101): try-catch block with error logging.

5. **Effective use of asynchronous data to enhance user experience (like filtering, sorting)**:
   - functions.js (line 106 ): sorting weather data by temperature before displaying it.
   - functions.js (lines 41-54): categorizing weather data by temperature, setting different colors for different temperature ranges.