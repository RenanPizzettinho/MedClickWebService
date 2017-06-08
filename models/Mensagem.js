/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  idMedico: {
    type: Schema.Types.ObjectId,
    ref: 'Medico',
    required: "Campo {PATH} é obrigatório.",
    default: '',
    trim: true
  },
  idPaciente: {
    type: Schema.Types.ObjectId,
    ref: 'Paciente',
    required: "Campo {PATH} é obrigatório.",
    default: '',
    trim: true
  },
  mensagem: require('./../fields/field-string-min-2-char-obrigatorio-unico'),
  criado_em: require('./../fields/field-criado-em'),
  situacao: ["Lida, Nova, Respondida"]

});

module.exports = mongoose.model('Mensagem', schema);