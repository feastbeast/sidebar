// const request = require('request');
// const faker = require('faker');
// const initData = require('./millionRecord.json');
// const milData = require('./millionRecord.json');
// const rp = require('request-promise')
// const fs = require('fs');
// const Places = require('./index.js');
// const Promise = require('bluebird');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://database/apateez-sidebar');


// getFullData = (places) => {
//   let counter = 0;
//       console.log('GET FULL DATA CALLED')
//   let seedData = () => {
//     let temp = {
//       id: places[counter].result.place_id,
//       name: places[counter].result.name,
//       menu_url: 'http://google.com',
//       address: places[counter].result.formatted_address,
//       location: places[counter].result.url,
//       url: places[counter].result.website,
//       phone: places[counter].result.international_phone_number,
//       hours: places[counter].result.opening_hours ? places[counter].result.
//       opening_hours.weekday_text : null,
//       coords: {
//         lat: places[counter].result.geometry.location.lat,
//         lng: places[counter].result.geometry.location.lng
//       }
//     };
//     console.log(temp)

//     Places.create(temp, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         counter++;
//         if (counter < places.length) {
//           seedData();
//         } else {
//           return;
//         }
//       }
//     });
//   };
//   seedData();
// };

// getFullData(initData);

// getFullData = (places) => {
//   let counter = 0;
//       //console.log('GET FULL DATA CALLED')
//   let seedData = () => {
//     let temp = {
//       id: places[counter].id,
//       name: places[counter].name,
//       menu_url: places[counter].menu_url,
//       address: places[counter].address,
//       location: places[counter].location,
//       url: places[counter].url,
//       phone: places[counter].phone,
//       hours: places[counter].hours,
//       coords: {
//         lat: places[counter].coords.lat,
//         lng: places[counter].coords.lng
//       }
//     };
//     console.log(temp)

//     Places.create(temp, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         counter++;
//         if (counter < 10) {
//           seedData();
//         } else {
//           return;
//         }
//       }
//     });
//   };
//   seedData();
// };

// getFullData(milData);

// module.exports = getFullData;

// mongoimport --jsonArray -d apateez-sidebar -c places --file millionRecord.json --num
// InsertionWorkers 8
