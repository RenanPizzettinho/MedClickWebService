/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  nome: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    minlength: 3
  },
  senha: {
    type: String,
    required: true,
    minlength: 6
  },
  cpf: {
    type: String,
    minlength: 11,
    maxlength: 11,
  },
  dtNascimento: {
    type: Date
  },
  criadoEm: {
    type: Date,
    required: true,
    default: Date.now
  },
  // REFERÊNCIA À OUTRA(S) COLLECTIONS
  idMedico: {
    type: Schema.Types.ObjectId,
    ref: 'Medico'
  },
  idPaciente: {
    type: Schema.Types.ObjectId,
    ref: 'Paciente'
  },

});

module.exports = mongoose.model('Usuario', schema, 'usuarios');
