'use strict';

let config = {
  keys: {
    'demo': 'Demo_Secret_Key',
    'test': 'TestSecretKey'
  },
  keepalive: {
    timeout: 300000 // setTimeout 5 minute in ms
  }
}

module.exports = config;
