const mongoose = require('mongoose');

const urlShortenerSchema = new mongoose.Schema({
  shortUrl: String,
  originalUrl: String,
});

module.exports = mongoose.model('UrlShortener', urlShortenerSchema);
