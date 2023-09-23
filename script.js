const cities = {
  4047198: 'Brighton',
  4697070: 'Henderson County',
  5437682: 'San Luis',
  5435464: 'Pueblo',
  5188029: 'East Pittsburgh',
};
const selectWrapper = document.querySelector('.out__select-wrapper');
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
  const paramGeoCodingPosition = `reverse-geocode?latitude=${lat}&longitude=${lon}&localityLanguage=en&key=${APIKEYGeoCod}`;

  const paramFetchWeatcher = `weather?lat=${lat}&lon=${lon}&units=${metricSys}&appid=${APIKEY}`;
  const paramFetchForecast = `forecast?lat=${lat}&lon=${lon}&units=${metricSys}&appid=${APIKEY}`;

  const resWeatcher = await fetch(URL + paramFetchWeatcher);
  const resForecast = await fetch(URL + paramFetchForecast);

  const dataW = await resWeatcher.json();
  const dataForecast = await resForecast.json();

  let geoCodingPosition = await fetch(URLGeoCod + paramGeoCodingPosition);
  let dataGeoPos = await geoCodingPosition.json();

  console.log(dataGeoPos); //============================================
  console.log(dataW); //============================================
  console.log(dataForecast); //============================================

  showWeather(dataW, dataGeoPos);
  showForecast(dataForecast);
  cityName = dataGeoPos.city;
  const paramMap = `map?key=${APIKEYMap}&center=${lat},${lon}&locations=${lat},${lon}&zoom=14&size=400,300&defaultMarker=marker-md-8950e8-f3b817-Y&banner=${cityName}&size=@2x`;
  imgUrlMap = URLMap + paramMap;

  document.getElementById('mapholder').innerHTML =
    "<img src='" + imgUrlMap + "'>";
}

// // create select ==================================================
// function createSel(cities) {
//   const select = document.createElement('select');
//   select.classList.add('main-weather__city-selection');
//   select.setAttribute('id', 'city');

//   for (let key in cities) {
//     let option = document.createElement('option');
//     option.value = key;
//     option.innerHTML = cities[key];
//     // select.append(option);
//     select.add(option, null);
//   }

//   selectWrapper.prepend(select);
// }
// createSel(cities);

// weather data ==================================================

// async function getWeather() {
//   // const cityId = document.querySelector('#city').value;
//   // console.log(lat, lon);
//   // const paramFetchWeatcher = `weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`;
//   // // const paramFetchWeatcher = `weather?id=${cityId}&units=metric&appid=${APIKEY}`;
//   // const paramFetchForecast = `forecast?id=${cityId}&units=metric&appid=${APIKEY}`;
//   // // const paramFetchForecast = `forecast?id=${cityId}&units=metric&appid=${APIKEY}`;
//   // const resWeatcher = await fetch(URL + paramFetchWeatcher);
//   // const resForecast = await fetch(URL + paramFetchForecast);
//   // const dataWeather = await resWeatcher.json();
//   // const dataForecast = await resForecast.json();
//   // console.log(dataWeather);
//   // console.log(dataForecast);
//   // showWeather(dataWeather);
//   // showForecast(dataForecast);
//   // fetch=================================================
//   // fetch(param.URL + paramFetch)
//   //   .then((weather) => {
//   //     return weather.json();
//   //   })
//   //   .then(showWeather)
//   //   .catch(function () {
//   //     //catch any errors
//   //   });
// }
// getWeather();

// document.querySelector('#city').onchange = getWeather;

function showWeather(dataW, dataGeoPos) {
  console.log(dataGeoPos);
  let dateUnixToDate = convertUnixToDate(dataW.timezone, dataW.dt);

  const dataWeather = {
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

  temp.innerHTML = Math.round(dataWeather.temp) + '&deg;';
  nameCity.innerHTML = 'Weather in ' + dataWeather.name;
  description.innerHTML = 'Description: ' + dataWeather.description;
  windDeg.innerHTML = 'Wind deg: ' + dataWeather.windDeg;
  windSpeed.innerHTML = 'Wind speed: ' + dataWeather.windSpeed;
  pressure.innerHTML = 'Pressure: ' + dataWeather.pressure;
}

function showForecast(data, timeDay) {
  // console.log(data);
  // let dateUnixToDate = convertUnixToDateForecast(
  //   data.city.timezone,
  //   data.list[0].dt
  // );

  timeDay = 5; //////////!!!!!!!!!!!!!!!!!!!!!! выбор времени даты
  let dt = data.list[timeDay].dt_txt.split(' ');
  console.log(dt); // ['2023-09-22', '12:00:00']
  console.log(dt[1].slice(0, -3)); // 12:00

  // const dataForecast = {
  //   icon: data.list[0].weather[0].icon, // 9.00 am
  // dt: dt,
  //   temp: data.main.temp,
  //   name: data.name,
  //   description: data.weather[0].description,
  //   windDeg: data.wind.deg,
  //   windSpeed: data.wind.speed,
  //   pressure: data.main.pressure,
  // };
}

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
