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
  cpf: require('./../fields/field-cpf'),
  dtNascimento: require('./../fields/field-date-with-parser'),
  criadoEm: require('./../fields/field-criado-em'),
  pessoa: pessoaSchema.schema,
  // medico: medicoSchema.schema,
  medico: {type: Schema.Types.ObjectId, ref: 'Medico'},
  paciente: pacienteSchema.schema
});

module.exports = mongoose.model('User', schema, 'usuarios');

// schema.pre('findOneAndUpdate', function (next) {
  // console.log('executando pre')
  // this.options.runValidators = true;
  // next();
// })
