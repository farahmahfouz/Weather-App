const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');

const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

const apiKey = '12f32e7c58456099c95f859d3ca2c51d';

searchBtn.addEventListener('click', () => {
  if (cityInput.value.trim() != '') {
    updateWeatherInfo(cityInput.value);
    cityInput.value = '';
    cityInput.blur();
  }
});

cityInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && cityInput.value.trim() != '') {
    updateWeatherInfo(cityInput.value);
    cityInput.value = '';
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiURL);
  return response.json();
}

function getWeatherIcon(id) {
  if (id <= 232) return 'thunderstorm.svg';
  if (id <= 321) return 'drizzle.svg';
  if (id <= 531) return 'rain.svg';
  if (id <= 622) return 'snow.svg';
  if (id <= 781) return 'atmosphere.svg';
  if (id <= 800) return 'clear.svg';
  else return 'clouds.svg';
}

function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  };
  return currentDate.toLocaleDateString('en-GB', options);
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData('weather', city);
  if (weatherData.cod !== 200) {
    showDisplaySection(notFoundSection);
    return;
  }

  console.log(weatherData);
  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  countryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp) + ' °C';
  conditionTxt.textContent = main;
  humidityValueTxt.textContent = humidity + '%';
  windValueTxt.textContent = speed + ' M/s';
  currentDateTxt.textContent = getCurrentDate();
  weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;

  showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    section => (section.style.display = 'none')
  );

  section.style.display = 'flex';
}
