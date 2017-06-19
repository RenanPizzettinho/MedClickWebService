'use strict';

let express = require('express');
let router = express.Router();
let usuario = require('../controller/usuario');

module.exports = function (ROUTER){


  router.post('/:id/perfil-pessoa', usuario.savePessoa);
  router.get('/', usuario.getAll);
  router.post('/', usuario.save);
  router.get('/:id', usuario.get);
  router.post('/:id/perfil-medico', usuario.saveMedico);
  router.post('/:id/perfil-paciente', usuario.savePaciente);

  ROUTER.use('/usuarios', router);
};

