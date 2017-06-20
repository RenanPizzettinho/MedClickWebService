'use strict';

let express = require('express');
let router = express.Router();
let atendimento = require('../controller/atendimento');

module.exports = function (ROUTER) {

  router.get('/:id', atendimento.getAll);
  router.post('/', atendimento.save);
  router.put('/:idAtendimento', atendimento.update);

  ROUTER.use('/atendimentos', router);
};

