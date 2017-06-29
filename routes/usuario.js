'use strict';

let express = require('express');
let router = express.Router();
let usuario = require('../controller/usuario');

module.exports = function (ROUTER){


  // router.post('/:id/perfil-pessoa', usuario.savePessoa);
  router.get('/', usuario.getAll);
  router.post('/', usuario.save);
  router.get('/:id', usuario.get);
  router.put('/:id', usuario.update);

  router.post('/:id/perfil-medico', usuario.saveMedico);
  router.get( '/:id/perfil-medico', usuario.getMedico);
  router.put( '/:id/perfil-medico', usuario.updateMedico);
  router.post('/:id/perfil-paciente', usuario.savePaciente);
  /*IMPLEMENTAR*/
  router.put('/:id/perfil-paciente', usuario.updatePaciente);
  router.get('/:id/perfil-paciente', usuario.getPaciente);


  ROUTER.use('/usuarios', router);
};

