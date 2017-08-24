/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  possuiDiabete: require('../fields/field-boolean-obrigatorio'),
  possuiPressaoAlta: require('../fields/field-boolean-obrigatorio'),
  integracoes: {
    azumio : mongoose.Schema.Types.Mixed
  },
  idUsuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true}
});

module.exports = mongoose.model('Paciente', schema);

