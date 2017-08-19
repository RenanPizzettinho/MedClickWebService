/**
 * Created by Uiliam on 11/08/2017.
 */

'use strict';

let express = require('express');
let router = express.Router();

module.exports = function (ROUTER) {

  router.get('/', function (req, res, next) {
    let token = req.query.oauth_token;
    console.log('token recebido', token)
    res.redirect('/index.html')
  });

  router.post('/', function (req, res, next) {
    console.log('@@@@   Post feito com sucesso..  @@@@');


    console.log(req.body);

    res.status(200).end()
  });




  ROUTER.use('/integracao/azumio', router);
};