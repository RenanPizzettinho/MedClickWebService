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
  email: require('./../fields/field-email'),
  senha: require('./../fields/field-senha'),
  cpf: require('./../fields/field-cpf'),
  dtNascimento: require('./../fields/field-date-with-parser'),
  idMedico: {type: Schema.Types.ObjectId, ref: 'Medico'},
  idPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
  criadoEm: require('./../fields/field-criado-em')
});

module.exports = mongoose.model('Usuario', schema, 'usuarios');

// schema.pre('findOneAndUpdate', function (next) {
// console.log('executando pre')
// this.options.runValidators = true;
// next();
// })
