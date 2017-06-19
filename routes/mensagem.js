'use strict';

let express = require('express');
let router = express.Router();
let mensagem = require('../controller/mensagem');

module.exports = function (ROUTER) {

  router.post('/', mensagem.save);
  router.get('/:id', mensagem.getAll);
  router.put('/:id', mensagem.update);

  ROUTER.use('/mensagens', router);
};

