const fs = require('fs');
const faker = require('faker');

// const photoRefs = require('./allPhotoRef.json')
// const dataType = 'smallList.json'

const fileType = 'tenMillionList.csv';
const entryNum = 10000000;
const createEntry = (counter) => {
  const fakename = faker.company.companyName();
  const id = counter;
  const name = fakename;
  const menuUrl = 'http://google.com';
  const address = `${faker.address.streetAddress()}, San Francisco, CA ${faker.address.zipCode()}, USA`;
  const location = `https://maps.google.com/?cid=${counter.toString()}`;
  const url = `www.${(fakename.split(' ')[0]).replace(/(^,)|(,$)/g, '')}.com`;
  const phone = faker.phone.phoneNumberFormat(1);
  const hours = [
    'Monday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Tuesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Wednesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Thursday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM',
    'Friday: 11:30 AM – 9:30 PM',
    'Saturday: 11:30 AM – 9:30 PM',
    'Sunday: 11:30 AM – 9:30 PM',
  ];
  const coordslat = faker.address.latitude();
  const coordslng = faker.address.longitude();

  const obj = `${id}|${name}|${menuUrl}|${address}|${location}|${url}|${phone}|"{${hours}}"|${coordslat}|${coordslng}`;
  return obj;
};

const generateJSON = () => {
  const options = {
    autoClose: true,
  };

  const writeStream = fs.createWriteStream(fileType, options);
  let i = -1;
  const write = function write() {
    let ok = true;
    do {
      i += 1;
      ok = writeStream.write(`${createEntry(i)}\n`);
    } while (i < entryNum && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    }
  };
  write();
};

generateJSON();

// psql -U yogitasheth apateez_sidebar -c “COPY places FROM ‘/Users/
// yogitasheth/desktop/feastbeastsidebar/sidebar/database/smallList.csv’ DELIMITER ‘|';”
