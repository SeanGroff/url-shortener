/**
 * env variables
 * Comment the require('dotenv').load() out for Glitch
 */
require('dotenv').load();

const express = require('express');
const mongoose = require('mongoose');

const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 1337;

/* Mongo DB Configs */
const mLab = `mongodb://${process.env.HOST}/${process.env.NAME}`;
const options = {
  autoIndex: false,
};

mongoose
  .connect(mLab, options)
  .then(() => console.log('Succesfully connected to DB'))
  .catch(err => console.log(`Error connecting to DB: ${err}`));

app.use(express.static('public'));

app.get('/:shortUrl', routes.shortUrl);

app.get('/new/:url(*)', routes.newShortUrl);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
