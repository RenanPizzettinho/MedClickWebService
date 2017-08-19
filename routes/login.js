/** Created by Uiliam on 31/05/2017. */

'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');

let login = require('../controller/login');

module.exports = function (ROUTER) {

  // router.post('/', login.integracao);

  router.post('/login', login.logar);
  router.post('/solicitar-senha', login.solicitarSenha);
  router.post('/redefinir-senha', login.redefinirSenha);


  ROUTER.use('/', router);
};