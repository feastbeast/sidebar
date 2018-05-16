const newrelic = require('newrelic');
const http = require('http');
const path = require('path');
const pgp = require('pg-promise')();
const redis = require('redis');
const fs = require('fs');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const port = process.env.PORT || 3010;
http.globalAgent.maxSockets = Infinity;
http.globalAgent.keepAlive = true;
const connectionObj = {
  user: 'yogitasheth',
  host: 'localhost',
  database: 'apateezside',
  port: 5432,
};
const db = pgp(connectionObj);

const client = redis.createClient();
client.on('ready', () => {
  console.log('Redis is ready');
});

client.on('error', () => {
  console.log('Error in Redis');
});

const requestHandler = function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const num = req.url.split('/')[2];
  if (Number(num)) {
    fs.readFile(path.join(__dirname, '../client/dist/index.html'), 'utf8', (err, data) => {
      if (err) {
          	// console.log(err)

          	res.writeHead(400);
          	res.end(err);
      } else {
	          res.writeHead(200, { 'Content-Type': 'text/html' });
	          res.end(data, 'utf8');
      }
    });
  }
  if (req.url.endsWith('.css')) {
    // console.log(req.url);
    const css = fs.createReadStream(path.join(__dirname, '../client/dist/sidebar.css'), 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/css' });
    css.pipe(res);
  }
  if (req.url.endsWith('sidebar.js')) {
    // console.log(req.url);
    const bundle = fs.createReadStream(path.join(__dirname, '../client/dist/sidebar.js'), 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    bundle.pipe(res);
  }
  if (req.url.endsWith('sidebar-server.js')) {
    // console.log(req.url);
    const bundle = fs.createReadStream(path.join(__dirname, '../client/dist/sidebar-server.js'), 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    bundle.pipe(res);
  }

  if (req.url.startsWith('/api')) {
    	const id = Number(req.url.split('/')[3]);


    client.get(id, (err, result) => {
      if (result) {
        // console.log("cached");
        res.writeHead(200);

        res.end(result);
      } else {
        const query = {
          // give the query a unique name
          name: 'fetch-user',
          text: 'SELECT * FROM apateezside WHERE id = $1',
          values: [id],
        };
        db.one(query)
          .then((result) => {
            // console.log("new")

            res.writeHead(200);
            res.end(JSON.stringify(result));
            client.setex(id, 3600, JSON.stringify(result));
          })
          .catch((error) => {
            // console.log(error)
            res.writeHead(400);
            res.end(error.toString());
          });
      }
    });
  }
};

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http.createServer(requestHandler).listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
  });

  console.log(`Worker ${process.pid} started`);
}

