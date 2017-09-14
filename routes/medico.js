'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');

let medico = require(path.join(__dirname, '../controller/medico'));

module.exports = function (ROUTER){

  router.get('/', medico.getAll);
  router.get('/:id', medico.getById);

  ROUTER.use('/medicos', router);
};

