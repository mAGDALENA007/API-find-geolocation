const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const app = express();

app.listen(3000, () => console.log('listening at 3000')); // port = 3000
app.use(express.static('public')); // 'Cannot use/' + hostuję statyczne częśći

app.use(express.json({ limit: '1mb' })); // opcje = limit wielkości przesłanej danej 1mega bajt

const database = new Datastore('database.db');
database.loadDatabase();

// *** router method *** HTTP GET Request 
// in -> app.html
app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

// *** router method *** HTTP POST Request with fetch() - Working with Data and APIs in JavaScript
// in -> index.html
app.post('/api', (request, response) => {
    console.log('i have got request');
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data); // instead push -> I put it in the DB
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.long
    });
});
