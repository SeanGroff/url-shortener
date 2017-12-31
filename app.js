const express = require('express');
const validUrl = require('valid-url');

const app = express();
const PORT = process.env.PORT || 1337;

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
