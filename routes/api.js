'use strict';

let express = require('express');
let router = express.Router();

let config = require('../lib/config');
let sms = require('../lib/sms');

let time = new Date().getTime();
let err = (message) => {
   return ({
      error: {
         message: message
      },
      time: time,
      status: 404
   });
};
/* GET api/sms page. */

router.get('/message', (req, res) => {
   let apiKey = req.query.api_key ? config.keys[req.query.api_key.toString()] : false;
   let apiSecret = req.query.api_secret ? req.query.api_secret.toString() : false;
   let to = req.query.to ? req.query.to.toString() : false;
   let text = req.query.text ? req.query.text.toString() : false;
   let toExp = new RegExp('^07([0-9]{8})$');

   if (!apiKey) {
      res.json(err('API Key invalid or not set'));
   } else if (apiKey && apiKey !== apiSecret) {
      res.json(err('API Secret invalid or not set'));
   } else if (!to || (to && !toExp.test(to)) ) {
      res.json(err('Phone number invalid or not set'));
   } else if (!text) {
      res.json(err('Text message not set'));
   } else if (text && text.length > 160) {
      res.json(err('Text message length > 160'));
   } else {
      res.json({
         to: to,
         text: text,
         count: text.length,
         time: time,
         status: 200
      });
   }
});

module.exports = router;
