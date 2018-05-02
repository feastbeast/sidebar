// const request = require('request');

const faker = require('faker');
const initData = require('./195-Zagat-AllData.json');
// const rp = require('request-promise')
// const fs = require('fs');
const Places = require('./index.js');
const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.connect('mongodb://database/apateez-sidebar');


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
//       hours: places[counter].result.opening_hours ? places[counter].result.opening_hours.weekday_text : null,
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





getFullData = () => {
  let counter = 1;
      console.log('GET FULL DATA CALLED')
  let seedData = () => {
    var name = faker.company.companyName();
    let temp = {
      id: counter.toString(),
      name: name,
      menu_url: 'http://google.com',
      address: `${faker.address.streetAddress()}, San Francisco, CA ${faker.address.zipCode()}, USA`,
      location: "https://maps.google.com/?cid="+counter.toString(),
      url: "www."+name.split(" ")[0]+".com",
      phone: faker.phone.phoneNumberFormat(1),
      hours: [
          "Monday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM",
          "Tuesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM",
          "Wednesday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM",
          "Thursday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM",
          "Friday: 11:30 AM – 9:30 PM",
          "Saturday: 11:30 AM – 9:30 PM",
          "Sunday: 11:30 AM – 9:30 PM"
        ],
      coords: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      }
    };
    console.log(temp)

    Places.create(temp, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        counter++;
        if (counter < 10000000) {
          seedData();
        } else {
          return;
        }
      }
    });
  };
  seedData();
};

getFullData();

module.exports = getFullData;