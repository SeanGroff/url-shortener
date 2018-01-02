/**
 * env variables
 * Comment the require('dotenv').load() out for Glitch
 */
require('dotenv').load();

const express = require('express');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 1337;

/* Mongo DB Configs */
const mLab = `mongodb://${process.env.HOST}/${process.env.NAME}`;
require('./models/UrlShortener');
const UrlShortener = mongoose.model('UrlShortener');
const options = {
  autoIndex: false,
};

mongoose
  .connect(mLab, options)
  .then(() => console.log('Succesfully connected to DB'))
  .catch(err => console.log(`Error connecting to DB: ${err}`));

app.use(express.static('public'));

app.get('/new/:url(*)', (req, res) => {
  validUrl.isWebUri(req.params.url)
    ? res.json({ url: 'valid' })
    : res.json({
        error:
          'Wrong url format, make sure you have a valid protocol and real site.',
      });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
