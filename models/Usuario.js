/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let medicoSchema = require('./Medico');
let pacienteSchema = require('./Paciente');

let schema = new Schema({
  nome: require('./../fields/field-string-min-2-char-obrigatorio'),
  // email: require('./../fields/field-email'),
  email: require('./../fields/field-string-min-2-char-obrigatorio'),
  // senha: require('./../fields/field-senha'),
  senha: require('./../fields/field-string-min-2-char-obrigatorio'),
  cpf: require('./../fields/field-cpf'),
  dtNascimento: require('./../fields/field-date-with-parser'),
  idMedico: {type: Schema.Types.ObjectId, ref: 'Medico'},
  idPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
  criadoEm: require('./../fields/field-criado-em'),
  location : {
    type: [Number],
    index: '2d'
  }
});

module.exports = mongoose.model('Usuario', schema, 'usuarios');
