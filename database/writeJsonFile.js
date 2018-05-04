const fs = require('fs');
const faker = require('faker');

fs.appendFileSync('./tenMillionRecord.json', '[', function (err) {
      if (err) throw err;
      console.log('Saved! - [');
      });

let generateFullListJsonFile = () => {

  for (let counter = 0; counter < 10000000; counter++) {
    var name = faker.company.companyName();
    let temp = {
      id: counter.toString(),
      name: name,
      menu_url: 'http://google.com',
      address: `${faker.address.streetAddress()}, San Francisco, CA ${faker.address.zipCode()}, USA`,
      location: "https://maps.google.com/?cid="+counter.toString(),
      url: "www."+(name.split(" ")[0]).replace(/(^,)|(,$)/g, "")+".com",
      phone: faker.phone.phoneNumberFormat(1),
      hours: [
          "Monday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM",
          "Tuesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM",
          "Wednesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM",
          "Thursday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM",
          "Friday: 11:30 AM – 9:30 PM",
          "Saturday: 11:30 AM – 9:30 PM",
          "Sunday: 11:30 AM – 9:30 PM"
        ],
      coordslat: faker.address.latitude(),  
      coordslng: faker.address.longitude()
      
    };
     if(counter < 9999999){
        fs.appendFileSync('./tenMillionRecord.json', JSON.stringify(temp)+',\n', function (err) {
          if (err) throw err;
            console.log('Saved!', counter);
        });
     }else{
        fs.appendFileSync('./tenMillionRecord.json', JSON.stringify(temp)+']', function (err) {
          if (err) throw err;
            console.log('Saved!', counter);
        });
     }
  }
}
generateFullListJsonFile();