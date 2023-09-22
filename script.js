const cities = {
  4047198: 'Brighton',
  4697070: 'Henderson County',
  5437682: 'San Luis',
  5435464: 'Pueblo',
  5188029: 'East Pittsburgh',
};
const selectWrapper = document.querySelector('.out__select-wrapper');
const out = document.querySelector('.out');

// create select ==================================================
function createSel(cities) {
  const select = document.createElement('select');
  select.classList.add('main-weather__city-selection');
  select.setAttribute('id', 'city');

  for (let key in cities) {
    let option = document.createElement('option');
    option.value = key;
    option.innerHTML = cities[key];
    // select.append(option);
    select.add(option, null);
  }

  selectWrapper.prepend(select);
}
createSel(cities);

// weather data ==================================================
async function getWeather() {
  const cityId = document.querySelector('#city').value;
  const paramFetchWeatcher = `weather?id=${cityId}&units=metric&appid=${APIKEY}`;
  const paramFetchForecast = `forecast?id=${cityId}&units=metric&appid=${APIKEY}`;

  const requestHeders = new Headers();
  requestHeders.append('apikey', APIKEY);

  const resWeatcher = await fetch(URL + paramFetchWeatcher);
  const resForecast = await fetch(URL + paramFetchForecast);

  const dataWeather = await resWeatcher.json();
  const dataForecast = await resForecast.json();
  console.log(dataWeather);
  console.log(dataForecast);
  showWeather(dataWeather);
  showForecast(dataForecast);

  // fetch=================================================
  // fetch(param.URL + paramFetch)
  //   .then((weather) => {
  //     return weather.json();
  //   })
  //   .then(showWeather)

  //   .catch(function () {
  //     //catch any errors
  //   });
}
getWeather();
document.querySelector('#city').onchange = getWeather;

// weather data output===================================================
let divImg = out.querySelector('div.out__icon');
let temp = out.querySelector('h3.out__temp');
let nameCity = out.querySelector('.out__name-city');
let description = out.querySelector('.out__description');
let windDeg = out.querySelector('.out__wind-deg');
let windSpeed = out.querySelector('.out__wind-speed');
let pressure = out.querySelector('.out__pressure');

function showWeather(data) {
  // console.log(data);
  let dateUnixToDate = convertUnixToDate(data.timezone, data.dt);

  const dataWeather = {
    icon: data.weather[0].icon,
    temp: data.main.temp,
    name: data.name,
    dt: dateUnixToDate,
    description: data.weather[0].description,
    windDeg: data.wind.deg,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
  };
  console.log(data.dt);

  console.log(dateUnixToDate);

  divImg.innerHTML = `<img class='out-icon' src='https://openweathermap.org/img/wn/${dataWeather.icon}@2x.png' alt='Image Watcher'>`;
  temp.innerHTML = Math.round(dataWeather.temp) + '&deg;';
  nameCity.innerHTML = 'Weather in ' + dataWeather.name;
  description.innerHTML = 'Description: ' + dataWeather.description;
  windDeg.innerHTML = 'Wind deg: ' + dataWeather.windDeg;
  windSpeed.innerHTML = 'Wind speed: ' + dataWeather.windSpeed;
  pressure.innerHTML = 'Pressure: ' + dataWeather.pressure;
}

function showForecast(data) {
  // console.log(data);
  // let dateUnixToDate = convertUnixToDateForecast(
  //   data.city.timezone,
  //   data.list[0].dt
  // );

  let dt = data.list[6].dt_txt.split(' ');
  console.log(dt);

  // const dataForecast = {
  //   icon: data.list[0].weather[0].icon, // 9.00 am
  // dt: dateUnixToDate,
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
// console.log(convertUnixToDate(unixTimestamp));
