/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  possuiDiabete: require('../fields/field-boolean-obrigatorio'),
  possuiPressaoAlta: require('../fields/field-boolean-obrigatorio'),
  localizacao : {
    type: [Number],
    index: '2d'
  },
  integracoes: {
    azumio: {
      token: require('../fields/field-string'),
      atualizadoEm: require('../fields/field-date-with-parser'),
      dados: [{
        _id: false,
        batimentos : Number,
        dataLeitura : Date,
      }]
    },
  },
  idUsuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true}
});

module.exports = mongoose.model('Paciente', schema);

