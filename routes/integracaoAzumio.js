/**
 * Created by Uiliam on 11/08/2017.
 */

'use strict';

let express = require('express');
let router = express.Router();

module.exports = function (ROUTER) {

  router.get('/azumio', function (req, res, next) {
    let token = req.query.oauth_token;
    console.log('token recebido', token)
    res.redirect('http://localhost:3000/index.html')
  });

  router.post('/', function (req, res, next) {

  });

  ROUTER.use('/integracao', router);
};