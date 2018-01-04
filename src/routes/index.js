const mongoose = require('mongoose');
const validUrl = require('valid-url');
const shortid = require('shortid');

require('../models/UrlShortener');
const UrlShortener = mongoose.model('UrlShortener');

module.exports = {
  newShortUrl: async function(req, res) {
    if (validUrl.isWebUri(req.params.url)) {
      const urlShortener = new UrlShortener({
        shortUrl: shortid.generate(),
        originalUrl: req.params.url,
      });
      try {
        const { shortUrl, originalUrl } = await urlShortener.save();
        res.json({ shortUrl, originalUrl });
      } catch (err) {
        console.log(`Failed writing to the database: ${err}`);
      }
    } else {
      res.json({
        error:
          'Wrong url format, make sure you have a valid protocol and real site.',
      });
    }
  },
  shortUrl: async function(req, res) {
    if (req.params.shortUrl) {
      try {
        const { originalUrl } = await UrlShortener.findOne({
          shortUrl: req.params.shortUrl,
        });
        res.redirect(originalUrl);
      } catch (err) {
        res.json({ error: 'Unable to locate URL' });
      }
    } else {
      res.json({ error: 'This URL does not exist in the database' });
    }
  },
};
