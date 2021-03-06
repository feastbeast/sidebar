const newrelic = require('newrelic');
const http = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const Places = require('../database/index.js');
const pgp = require('pg-promise')();
// const { Client, Pool } = require('pg');
http.globalAgent.maxSockets = Infinity;
http.globalAgent.keepAlive = true;
http.globalAgent.maxFreeSockets = Infinity;
const app = express();
app.disable('etag').disable('x-powred-by');
const server = http.createServer(app);
const redis = require('redis');

const client = redis.createClient();
client.on('ready', () => {
  console.log('Redis is ready');
});

client.on('error', () => {
  console.log('Error in Redis');
});
const port = process.env.PORT || 3010;
// const connectionObj = {
//   user: 'yogitasheth',
//   host: 'localhost',
//   database: 'apateezside',
//   port: 5432,
// };
const connectionObj = {
  user: 'pguser',
  host: '52.36.162.25',
  database: 'apateez',
  password: 'pguser',
  port: 5432,
};
const db = pgp(connectionObj);
// const pool = new Pool(connectionObj);
// const client = new Client(connectionObj);

app.use(compression());
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
  // res.end();
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
      client.setex(id, 3600, JSON.stringify(result));
      res.status(200).send(result);
      res.flush();
      res.end();
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
const getCache = (req, res) => {
  const id = req.params.id;
  client.get(id, (err, result) => {
    if (result) {
      // console.log(`cached ${result}`);
      res.send(result);
      res.flush();
      // res.end();
    } else {
      getRestaurant(req, res);
    }
  });
};
app.get('/api/restaurants/:id', getCache);
server.timeout = 0;
// server.keepAliveTimeout=745456464586;
server.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

