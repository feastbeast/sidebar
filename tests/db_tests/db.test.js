const db = require('../../database/index.js');

let place_id = '2';

test('the response data contains an array for the place hours', () => {
  expect.assertions(1);
  return db.findOne({'id': place_id}).then((data) => {
    expect(Array.isArray(data.hours)).toBe(true);
  });
});

test('the response data contains an array of daily hours of length 7', () => {
  expect.assertions(1);
  return db.findOne({'id': place_id}).then((data) => {
    expect(data.hours.length).toBe(7);
  });
});

test('the response data contains the place name', () => {
  expect.assertions(1);
  return db.findOne({'id': place_id}).then((data) => {
    expect(!!data.name).toBe(true);
  });
});


