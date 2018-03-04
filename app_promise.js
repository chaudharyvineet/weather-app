const yargs = require('yargs');
const axios = require('axios');

 const argv = yargs
  .options({
   a: {
     demand : true,
     alias: 'address',
     describe: 'Address to fetch weather for',
     string:  true
   }
   })
   .help()
   .alias('help', 'h')
   .argv;

 var encodedAddress = encodeURIComponent(argv.address);
 var geocodeUrl =`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
 var address=''
 axios.get(geocodeUrl).then((response) => {
   if (response.data.status === 'ZERO_RESULTS') {
     throw new Error('Unable to find that address.');
   }
   var lat = response.data.results[0].geometry.location.lat;
   var lng = response.data.results[0].geometry.location.lng;
   var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
   address = response.data.results[0].formatted_address;
   console.log(address);
   return axios.get(weatherUrl);
 }).then((response) => {
   var temperature = response.data.currently.temperature;
   var apparentTemperature = response.data.currently.apparentTemperature;
      var summary = response.data.currently.summary;
   var precipType = response.data.currently.precipType;
   var precipProbability = response.data.currently.precipProbability;
   var humidity = response.data.currently.humidity;
   var windSpeed = response.data.currently.windSpeed;
   console.log(`Temperature:  ${temperature}. Feels like: ${apparentTemperature}.  Summary: ${summary}.  Precipitation Type: ${precipType}.   Probability: ${precipProbability}.   Humidity: ${humidity}.   Wind Speed: ${windSpeed}.`);
    var accountSid = 'AC5e4b48dbd5d0885a1b5a35146861a235'; // Your Account SID from www.twilio.com/console
    var authToken = '7b675698a583498f3ce86e612aed5034';   // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);

    client.messages.create({
        body: `Location: ${address}.  Temperature:  ${temperature}. Feels like: ${apparentTemperature}.  Summary: ${summary}.  Precipitation Type: ${precipType}.   Probability: ${precipProbability}.   Humidity: ${humidity}.   Wind Speed: ${windSpeed}.`,

        to: '+917015386369',  // Text this number
        from: '+32460208893' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}).catch((e) => {
   if (e.code === 'ENOTFOUND') {
     console.log('Unable to connect to API servers.');
   } else {
     console.log(e.message);
   }
 });
 //
 // var accountSid = 'AC5e4b48dbd5d0885a1b5a35146861a235'; // Your Account SID from www.twilio.com/console
 // var authToken = '7b675698a583498f3ce86e612aed5034';   // Your Auth Token from www.twilio.com/console
 //
 // var twilio = require('twilio');
 // var client = new twilio(accountSid, authToken);
 //
 // client.messages.create({
 //     body: temperature,
 //     to: '+917015386369',  // Text this number
 //     from: '+32460208893' // From a valid Twilio number
 // })
 // .then((message) => console.log(message.sid));




//var weatherUrl = `https://api.darksky.net/forecast/85740a4b1e944ed7722b64ab458b1ec6c/${lat},${lng}`;
