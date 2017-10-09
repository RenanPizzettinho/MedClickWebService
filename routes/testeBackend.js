/** Created by Uiliam on 31/05/2017. */

'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');

module.exports = function (ROUTER) {
  router.get('/teste', (req, res) => res.json({data: 'OK'}));

  ROUTER.use('/', router);
};