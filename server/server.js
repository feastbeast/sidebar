const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const Places = require('../database/index.js');
const pgp = require('pg-promise')();
// const { Client, Pool } = require('pg');

const app = express();
const redis = require('redis');

const client = redis.createClient();
client.on('ready', () => {
  console.log('Redis is ready');
});

client.on('error', () => {
  console.log('Error in Redis');
});
const port = process.env.PORT || 3001;
const connectionObj = {
  user: 'yogitasheth',
  host: 'localhost',
  database: 'apateezside',
  port: 5432,
};
const db = pgp(connectionObj);
// const pool = new Pool(connectionObj);
// const client = new Client(connectionObj);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/restaurants', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// MongoDB
// app.get('/api/restaurants/:id', function(req, res) {
//   let q = Places.findOne({id: req.params.id});

//   q.exec((err, place) => {
//     if (err) { console.log(err) }
//     //console.log('PLACE: ', place)
//     res.send(place);
//   });
// });
const getRestaurant = (req, res) => {
  const id = req.params.id;
  const query = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT * FROM apateezside WHERE id = $1',
    values: [id],
  };
  db.one(query)
    .then((result) => {
      console.log(`db ${result}`);

      client.setex(id, 3600, JSON.stringify(result));
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
const getCache = (req, res) => {
  const id = req.params.id;
  client.get(id, (err, result) => {
    if (result) {
      console.log(`cached ${result}`);
      res.send(result);
    } else {
      getRestaurant(req, res);
    }
  });
};
app.get('/api/restaurants/:id', getCache);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
