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

const saveUrlShortener = async urlShortener => {
  try {
    return await urlShortener.save();
  } catch (err) {
    console.log(`Failed to save to DB: ${err}`);
  }
};

app.use(express.static('public'));

app.get('/new/:url(*)', async (req, res) => {
  if (validUrl.isWebUri(req.params.url)) {
    const urlShortener = new UrlShortener({
      shortUrl: shortid.generate(),
      originalUrl: req.params.url,
    });
    try {
      const { shortUrl, originalUrl } = await saveUrlShortener(urlShortener);
      res.json({ shortUrl, originalUrl });
    } catch (err) {
      console.log(`Failed extracting data from Promise: ${err}`);
    }
  } else {
    res.json({
      error:
        'Wrong url format, make sure you have a valid protocol and real site.',
    });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
