const mongoose = require('mongoose');

const mongoUrlDocker = 'mongodb://database/apateez-sidebar';

const mongoUrl = 'mongodb://localhost/apateez-sidebar';

mongoose.connect(mongoUrl);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrlDocker);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {}); // connected

const placesSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: String,
  menu_url: String,
  address: String,
  location: String,
  url: String,
  phone: String,
  hours: [],
  coords: {
    lat: String,
    lng: String,
  },
});

const Places = mongoose.model('Places', placesSchema);

const clearDb = (cb) => {
  Places.remove({}, cb);
};

module.exports = Places;
exports.clearDb = clearDb;
