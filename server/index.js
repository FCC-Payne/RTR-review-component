const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();

const options = {
  setHeaders: (res) => {
    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
  },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/:id', express.static(path.join(__dirname, '/../public')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist'), options));

app.get('/:id/reviews', (req, res) => {
  db.getReviews(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send('ERROR FETCHING FROM DATABASE', err);
    } else {
      res.status(200).set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' }).send(JSON.stringify(data));
    }
  });
});

app.listen(3002);
