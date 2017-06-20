'use strict';

let express = require('express');
let router = express.Router();
let usuario = require('../controller/medico');

module.exports = function (ROUTER){


  router.get('/', usuario.getAll);

  ROUTER.use('/medicos', router);
};

