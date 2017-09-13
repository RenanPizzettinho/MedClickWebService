/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  crm: require('./../fields/field-string-obrigatorio'),
  estado: require('./../fields/field-string-obrigatorio'),
  atendeEm: require('./../fields/field-string-min-2-char-obrigatorio'),
  especialidade: require('./../fields/field-string-min-2-char-obrigatorio'),
  diasAtendimentoDomicilio: [require('./../fields/field-enum-dia-semana')],
  idUsuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
  localizacao: require('./../fields/field-localizacao'),
  endereco : require('./../fields/field-string'),
  distanciaMaxima: require('./../fields/field-number'),
});

module.exports = mongoose.model('Medico', schema);
