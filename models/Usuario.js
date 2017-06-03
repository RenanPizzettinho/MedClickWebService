/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let medicoSchema = require('./Medico');

let schema = new Schema({
  nome: require('./../fields/field-string-min-2-char-obrigatorio'),
  email: require('./../fields/field-email'),
  senha: require('./../fields/field-senha'),
  // paciente: {type: Schema.Types.Mixed},
  paciente: medicoSchema.schema,
  medico: {type: Schema.Types.Mixed}
});

module.exports = mongoose.model('User', schema);
