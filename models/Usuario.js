/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let medicoSchema = require('./Medico');
let pacienteSchema = require('./Paciente');
let pessoaSchema = require('./Pessoa');

let schema = new Schema({
  nome: require('./../fields/field-string-min-2-char-obrigatorio'),
  email: require('./../fields/field-email'),
  senha: require('./../fields/field-senha'),
  pessoa: pessoaSchema.schema,
  medico: medicoSchema.schema,
  paciente: pacienteSchema.schema
});

module.exports = mongoose.model('User', schema, 'users');
