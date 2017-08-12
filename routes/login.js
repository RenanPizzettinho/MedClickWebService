/** Created by Uiliam on 31/05/2017. */

'use strict';

let express = require('express');
let router = express.Router();
let login = require('../controller/login');

module.exports = function (ROUTER) {

  router.post('/login', login.logar);
  router.post('/solicitar-senha', login.solicitarSenha);
  router.post('/redefinir-senha', login.redefinirSenha);
  router.get('/integracao', function (req, res, next) {
    res.json({nome: "Uiliam"})
  })

  ROUTER.use('/', router);
};