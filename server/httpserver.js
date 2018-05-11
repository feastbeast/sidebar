const newrelic = require('newrelic');
const http = require('http');
const path = require('path');
const pgp = require('pg-promise')();
const redis = require('redis');
const fs = require('fs');
const port = process.env.PORT || 3010;
const connectionObj = {
  user: 'yogitasheth',
  host: 'localhost',
  database: 'apateezside',
  port: 5432,
};
const db = pgp(connectionObj);

const requestHandler = function (req, res){
	var num = req.url.split('/')[2];
	if(Number(num)){
		fs.readFile(path.join(__dirname, '../client/dist/index.html'), 'utf8', function(err, data){
          if (err){
          	console.log(err)
          	res.writeHead(400);
          	res.end(err);
          }else{
	          res.writeHead(200, {'Content-Type': 'text/html'});
	          res.end(data, 'utf8');   
          }
        });  
    }   
    if (req.url.endsWith('.css')) { 
      const css = fs.createReadStream(path.join(__dirname, '../client/dist/style.css'), 'utf8');
      res.writeHead(200, {'Content-Type': 'text/css'});
      css.pipe(res);
    }   
    if (req.url.endsWith('.js')) { 
      const bundle = fs.createReadStream(path.join(__dirname, '../client/dist/bundle.js'), 'utf8');
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      bundle.pipe(res);
    } 
    if(req.url.startsWith('/api')){
    	var id = req.url.split("/")[2];
    	console.log(req.url);
    	const query = {
		    // give the query a unique name
		    name: 'fetch-user',
		    text: 'SELECT * FROM apateezside WHERE id = $1',
		    values: [id],
		};
		db.one(query)
		.then((result) => {
		    res.writeHead(200);	
		    res.end(result);
		      
		})
		.catch((error) => {
		    res.writeHead(400);
          	res.end(error.toString());
		});
    }    
             
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})