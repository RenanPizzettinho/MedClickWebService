'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');

let usuario = require(path.join(__dirname, '../controller/medico'));

module.exports = function (ROUTER){


  router.get('/', usuario.getAll);

  ROUTER.use('/medicos', router);
};

