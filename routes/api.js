'use strict';

let express = require('express');
let router = express.Router();

let config = require('../lib/config');
let SMS = require('../lib/sms');

let time = new Date().getTime();
let err = (key, message) => {
   return ({
      error: {
         [(key || message)]: message
      },
      time: time,
      status: 404
   });
};

let getParams = (req) => {
   let apiKey = false;
   let apiSecret = false;
   let to = false;
   let text = false;
   let type = 'text';
   switch (req.method) {
      case 'POST':
         apiKey = req.body.api_key ? config.keys[req.body.api_key.toString()] : false;
         apiSecret = req.body.api_secret ? req.body.api_secret.toString() : false;
         to = req.body.to ? req.body.to.toString() : false;
         text = req.body.text ? req.body.text.toString() : false;
         type = req.body.type ? req.body.type.toString() : 'text';
         break;
      default:
         apiKey = req.query.api_key ? config.keys[req.query.api_key.toString()] : false;
         apiSecret = req.query.api_secret ? req.query.api_secret.toString() : false;
         to = req.query.to ? req.query.to.toString() : false;
         text = req.query.text ? req.query.text.toString() : false;
         type = req.query.type ? req.query.type.toString() : 'text';
         break;
   }
   return {
      to: to,
      text: text,
      type: type,
      apiKey: apiKey,
      apiSecret: apiSecret
   };
};

/* GET api/identify page. */
router.all('/identify', (req, res) => {
   SMS.identify({to: params.to, text: params.text}, (response) => {
      res.json({
         response: response,
         time: time,
         status: 200
      });
   });
});

/* GET/POST api/message page. */
router.all('/message', (req, res) => {
   let params = getParams(req);
   let toExp = new RegExp('^07([0-9]{8})$');

   if (!params.apiKey) {
      res.json(err('api_key', 'API Key invalid or not set'));
   } else if (params.apiKey && params.apiKey !== params.apiSecret) {
      res.json(err('api_secret', 'API Secret invalid or not set'));
   } else if (!params.to || (params.to && !toExp.test(params.to)) ) {
      res.json(err('to', 'Phone number invalid or not set'));
   } else if (!params.text) {
      res.json(err('text', 'Text message not set'));
   } else if (params.text && params.text.length > 160) {
      res.json(err('text', 'Text message length > 160'));
   } else {
      SMS.send({to: params.to, text: params.text}, (response) => {
         res.json({
            response: response,
            to: params.to,
            text: params.text,
            count: params.text.length,
            time: time,
            status: 200
         });
      });
   }
});

module.exports = router;
