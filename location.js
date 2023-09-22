// Using the Geolocation API ===============================================
const x = document.getElementById('demo');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
}

// function showPosition(position) {
//   x.innerHTML =
//     'Latitude: ' +
//     position.coords.latitude +
//     '<br>Longitude: ' +
//     position.coords.longitude;
// }
getLocation();

//Displaying the Result in a Map ============================================
function showPosition(position) {
  //   let latlon = position.coords.latitude + ',' + position.coords.longitude;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  //   let city = document.querySelector('#city').options;
  console.log(position);
  //   console.log(city);

  let img_url = `${URLMap}map?key=${APIKEYMap}&center=${lat},${lon}&locations=${lat},${lon}&zoom=14&size=400,300&defaultMarker=marker-md-8950e8-f3b817-Y&banner=&size=@2x`;

  document.getElementById('mapholder').innerHTML =
    "<img src='" + img_url + "'>";
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
