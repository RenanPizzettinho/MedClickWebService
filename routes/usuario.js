'use strict';

let express = require('express');
let router = express.Router();
let usuario = require('../controller/usuario');

module.exports = function (ROUTER){


  router.get('/', usuario.getAll);
  router.post('/', usuario.save);
  router.get('/:id', usuario.get);
  router.post('/:id/medicos', usuario.saveMedico);

  ROUTER.use('/usuarios', router);
};

