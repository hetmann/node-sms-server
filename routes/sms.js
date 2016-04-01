'use strict';

let express = require('express');
let router = express.Router();

/* SMS Post message */
router.get('/', function(req, res, next) {
  res.render('sms', { title: 'Send new sms' });
});

module.exports = router;