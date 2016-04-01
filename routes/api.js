"use strict";

var express = require('express');
var router = express.Router();

/* GET api page. */
router.all('/', (req, res) => {
   res.json({error: 'use /api/sms?phone=+40123456789&message=hello'});
});

/* GET api/sms page. */
router.get('/sms', (req, res) => {
   let phone = req.query.phone ? req.query.phone.toString() : '+407567891234';
   let message = req.query.message ? req.query.message.toString() : 'Message from API';
   let time = new Date();

   res.json({
      phone: phone,
      message: message,
      count: message.length,
      time: time
   });
});

module.exports = router;
