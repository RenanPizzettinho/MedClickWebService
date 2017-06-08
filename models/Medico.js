/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  _id : false,
  crm: require('./../fields/field-string-min-2-char-obrigatorio-unico'),
  especialidade: require('./../fields/field-string-min-2-char-obrigatorio'),
  dias_atendimento_domicilio: {
    type: String,
    enum: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
    required: true
  },
});

module.exports = mongoose.model('Medico', schema);