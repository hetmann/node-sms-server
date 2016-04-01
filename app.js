'use strict';

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let api = require('./routes/api');
let help = require('./routes/help');
let sms = require('./routes/sms');
let app = express();

// view engine setup // disabled to use only the API functions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/sms', sms);
app.use('/api', api);
app.use('/', help);

module.exports = app;
