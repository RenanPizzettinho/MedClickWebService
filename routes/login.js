/** Created by Uiliam on 31/05/2017. */

'use strict';

let express = require('express');
let router = express.Router();
let login = require('../controller/login');

module.exports = function (ROUTER) {

  router.post('/login', login.logon);
  router.post('/request-password', login.requestPass);
  router.post('/reset-password', login.modifyPass);

  ROUTER.use('/', router);
};