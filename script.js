const URL = 'http://api.openweathermap.org/data/2.5/';
const APIKEY = '3c2ab57f9f8c15dd6a412a2691437821';

const URLMap = 'https://www.mapquestapi.com/staticmap/v5/';
const APIKEYMap = 'BFGCW1QUqYWdZ5MdzIyaDQkr0ti1jvZG';

const URLGeoCod = 'https://api-bdc.net/data/';
const APIKEYGeoCod = 'bdc_459d13c40cb94532841b7bd393af14e1';
// cansel config.js ====================================================
const out = document.querySelector('.out');
const metricSel = document.querySelector('#metric');

// weather data output===================================================
let divImg = out.querySelector('div.out__icon');
let temp = out.querySelector('h3.out__temp');
let nameCity = out.querySelector('.out__name-city');
let description = out.querySelector('.out__description');
let windDeg = out.querySelector('.out__wind-deg');
let windSpeed = out.querySelector('.out__wind-speed');
let pressure = out.querySelector('.out__pressure');

// Using the Geolocation API ===============================================
const geolocOut = document.getElementById('location-sapport');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosWeatForecast, showError);
  } else {
    geolocOut.innerHTML = 'Geolocation is not supported by this browser.';
  }
}
getLocation();

// Metric and Imperial system ============================================

let metricSys = 'metric';

metricSel.addEventListener('change', (metricSysVal) => {
  metricSysVal = document.querySelector('#metric').value;
  metricSys = metricSysVal;
  getLocation();
});

//Displaying the Result in a Map ============================================
async function showPosWeatForecast(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let scrnWidth = screen.width - 64;
  const paramGeoCodingPosition = `reverse-geocode?latitude=${lat}&longitude=${lon}&localityLanguage=en&key=${APIKEYGeoCod}`;

  const paramFetchWeatcher = `weather?lat=${lat}&lon=${lon}&units=${metricSys}&appid=${APIKEY}`;
  const paramFetchForecast = `forecast?lat=${lat}&lon=${lon}&units=${metricSys}&appid=${APIKEY}`;

  let dataW;
  let dataForecast;

  try {
    const resWeatcher = await fetch(URL + paramFetchWeatcher);
    dataW = await resWeatcher.json();
  } catch (error) {
    console.error(error);
  }
  try {
    const resForecast = await fetch(URL + paramFetchForecast);
    dataForecast = await resForecast.json();
  } catch (error) {
    console.error(error);
  }

  let geoCodingPosition = await fetch(URLGeoCod + paramGeoCodingPosition);
  let dataGeoPos = await geoCodingPosition.json();

  showWeather(dataW, dataGeoPos);
  showForecast(dataForecast);

  if (scrnWidth >= 300) scrnWidth = 300;

  cityName = dataGeoPos.city;
  const paramMap = `map?key=${APIKEYMap}&center=${lat},${lon}&locations=${lat},${lon}&zoom=14&size=${scrnWidth},300&defaultMarker=marker-md-8950e8-f3b817-Y&banner=${cityName}&size=@2x`;
  imgUrlMap = URLMap + paramMap;

  document.getElementById('mapholder').innerHTML =
    "<img src='" + imgUrlMap + "'>";
}

function showWeather(dataW, dataGeoPos) {
  let dateUnixToDate = convertUnixToDate(dataW.timezone, dataW.dt);

  const dataWeather = {
    id: dataW.id,
    icon: dataW.weather[0].icon,
    temp: dataW.main.temp,
    name: dataGeoPos.city,
    dt: dateUnixToDate,
    description: dataW.weather[0].description,
    windDeg: dataW.wind.deg,
    windSpeed: dataW.wind.speed,
    pressure: dataW.main.pressure,
  };

  // console.log(data.dt);

  // console.log(dateUnixToDate);

  // console.log(dataWeather.name);

  divImg.innerHTML = `<img class='out-icon' src='https://openweathermap.org/img/wn/${dataWeather.icon}@2x.png' alt='Image Watcher'>`;

  // K and gradus
  let tempMetric = 'K';
  if (metricSys === 'metric') {
    tempMetric = '&deg;';
  }

  temp.innerHTML = Math.round(dataWeather.temp) + tempMetric;
  nameCity.innerHTML = 'Weather in ' + dataWeather.name;
  description.innerHTML = 'Description: ' + dataWeather.description;
  windDeg.innerHTML = 'Wind deg: ' + dataWeather.windDeg;
  windSpeed.innerHTML = 'Wind speed: ' + dataWeather.windSpeed;
  pressure.innerHTML = 'Pressure: ' + dataWeather.pressure;

  // widjet watcher ==========================================================
  window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
  window.myWidgetParam.push({
    id: 2,
    cityid: dataWeather.id,
    appid: APIKEY,
    units: metricSys,
    containerid: 'openweathermap-widget-1',
  });
  (function () {
    var script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src =
      '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  })();
}

const spoiler = document.querySelector('.out__open-spoiler');
const spoilerOpen = document.querySelector('.main-weather__spoiler');
const spolersItem = document.querySelectorAll('.spoiler__item');

const widget = document.querySelector('.widget__title');
const widgetOpen = document.querySelector('.widget__main');

spoiler.addEventListener('click', () => {
  if (spoiler) spoiler.classList.toggle('spoiler-open');
  spoilerOpen.slideToggle(300);
});

widget.addEventListener('click', () => {
  if (widget) widget.classList.toggle('widget-open');
  widgetOpen.slideToggle(300);
});

function showForecast(data) {
  // timeDay = 5; //////////!!!!!!!!!!!!!!!!!!!!!! выбор времени даты
  // let dt = data.list[timeDay].dt_txt.split(' ');
  // console.log(dt); // ['2023-09-22', '12:00:00']
  // console.log(dt[1].slice(0, -3)); // 12:00

  console.log('spoler work');

  let spoilerItemDate;
  let spoilerItemTemp;
  let spoilerItemIcon;
  const arrDay = [9, 17, 25, 33, 39]; // day 12.00

  if (spolersItem.length) {
    spolersItem.forEach((item, ind) => {
      spoilerItemDate = item.querySelector('.spoiler__item>h4');
      spoilerItemTemp = item.querySelector('.spoiler__block-tmp>h4');
      spoilerItemIcon = item.querySelector(
        '.spoiler__block-tmp>.spoiler__icon'
      );

      let dt = data.list[arrDay[ind]].dt_txt.split(' ')[0];
      let temp = data.list[arrDay[ind]].main.temp;
      let icon = data.list[arrDay[ind]].weather[0].icon;

      // K and gradus
      let tempMetric = 'K';
      if (metricSys === 'metric') {
        tempMetric = '&deg;';
      }
      spoilerItemTemp.innerHTML = Math.round(temp) + tempMetric;
      spoilerItemDate.innerHTML = dt;
      spoilerItemIcon.innerHTML = `<img class='out-icon' src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='Image Watcher'>`;
    });
  }
}

// convertUnixToDate ============================================

function convertUnixToDate(dataTimeZone, dataDt) {
  const objData = {};

  const timezone = dataTimeZone;
  const dt = dataDt;
  const dateTime = new Date(dt * 1000);
  const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
  const currentLocalTime = toUtc + 1000 * timezone;
  const selectedDate = new Date(currentLocalTime);

  const date = selectedDate.toLocaleString('en-GB', {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
  });
  const year = selectedDate.toLocaleString('en-GB', {
    year: 'numeric',
  });
  const hour = selectedDate.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  objData.date = `${date}`;
  objData.year = `${year}`;
  objData.hour = `${hour}`;

  return objData;
  // return `${date} ${year} ${hour}`;
}

function convertUnixToDateForecast(dataTimeZone, dataDt) {
  const timezone = dataTimeZone;
  const dt = dataDt;
  const dateTime = new Date(dt * 1000);
  const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
  const currentLocalTime = toUtc + 1000 * timezone;
  const selectedDate = new Date(currentLocalTime);

  const date = selectedDate.toLocaleString('en-GB', {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
  });
  const year = selectedDate.toLocaleString('en-GB', {
    year: 'numeric',
  });
  const hour = selectedDate.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${date} ${year} ${hour}`;
}

// Handling Errors and Rejections  ============================================
function showError(error) {
  console.log(error);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = 'User denied the request for Geolocation.';
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      x.innerHTML = 'The request to get user location timed out.';
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = 'An unknown error occurred.';
      break;
  }
}
