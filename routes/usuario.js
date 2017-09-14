'use strict';

let express = require('express');
let router = express.Router();
let usuario = require('../controller/usuario');

module.exports = function (ROUTER){


  router.post('/', usuario.saveUsuario);
  router.get('/:id', usuario.getUsuario);
  router.get('/', usuario.getAllUsuario);
  router.put('/:id', usuario.updateUsuario);

  router.post('/:id/perfil-medico', usuario.saveMedico);
  router.get( '/:id/perfil-medico', usuario.getMedico);
  router.put( '/:id/perfil-medico', usuario.updateMedico);

  router.post('/:id/perfil-paciente', usuario.savePaciente);
  router.get('/:id/perfil-paciente', usuario.getPaciente);
  router.put('/:id/perfil-paciente', usuario.updatePaciente);


  ROUTER.use('/usuarios', router);
};

