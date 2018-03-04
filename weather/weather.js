// const request = require('request');
//
// var getWeather = (lat, lng, callback) => {
//   request({
//     url: `https://api.darksky.net/forecast/85740a4b1e944ed7722b64ab458b1ec6c/${lat},${lng}`,
//     json: true
//   }, (error, response, body) => {
//     if (error) {
//       callback('Unable to connect to Forecast.io server.');
//     } else if (response.statusCode === 400) {
//       callback('Unable to fetch weather.');
//     } else if (response.statusCode === 200) {
//         callback(undefined, {
//         summary:  body.currently.summary,
//         precipType: body.currently.precipType,
//         precipProbability: body.currently.precipProbability,
//         temperature: body.currently.temperature,
//         humidity: body.currently.humidity,
//         windSpeed: body.currently.windSpeed
//         });
//     }
//   });
// };
//
// module.exports.getWeather = getWeather;

const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
               summary:  body.currently.summary,
               precipType: body.currently.precipType,
               precipProbability: body.currently.precipProbability,
               temperature: body.currently.temperature,
               humidity: body.currently.humidity,
               windSpeed: body.currently.windSpeed
     });
    }
  });
};

module.exports.getWeather = getWeather;
