'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');

let paciente = require(path.join(__dirname, '../controller/paciente'));

module.exports = function (ROUTER) {

  router.get('/:id', paciente.getById);

  ROUTER.use('/pacientes', router);
};

