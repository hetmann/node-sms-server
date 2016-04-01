'use strict';

let express = require('express');
let router = express.Router();
let time = new Date().getTime();

/* GET api help. */
router.all('*', (req, res) => {
   res.json({
      usage: {
         method: {
            'POST': '/api/message',
            'GET': '/api/message?api_key=__key__&api_secret=__secret__&to=__number__&text=__encoded-text__&type=__text-or-flash__'
         },
         options: {
            api_key: 'REQUIRED: API_KEY',
            api_secret: 'REQUIRED: API_SECRET',
            to: 'REQUIRED: phone number in international format: +40722000000 or national format: 0722000000',
            text: 'REQUIRED: 160 characters for text message',
            type: 'OPTIONAL: text - default text message, flash - FLASH text message'
         }
      },
      time: time,
      status: 404
   });
});

module.exports = router;
