/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;


let schema = new Schema({
  descricaoNecessidade: {
    type: String,
    required: true,
    trim: true,
  },
  localizacao: {
    type: [
      {
        type: Number,
        trim: true
      }
    ],
    index: '2dsphere',
    required: true
  },
  endereco: {
    rua: {
      type: String,
      trim: true
    },
    cidade: {
      type: String,
      trim: true
    },
    estado: {
      type: String,
      trim: true
    },
    pais: {
      type: String,
      trim: true
    },
    cep: {
      type: String,
      trim: true
    },
  },
  complemento: {
    type: String,
    trim: true
  },
  dataConsulta: {
    type: Date,
    required: true
  },
  feedbackConsulta: {
    type: String,
    trim: true
  },
  situacao: {
    type: String,
    enum: ["EM_ABERTO", "CONFIRMADO", "CANCELADO", "ATENDIDO"],
    default: 'EM_ABERTO',
    required: true,
    trim: true
  },
  motivoCancelamento: {
    type: String,
    trim: true
  },
  dataRegistro: {
    type: Date,
    required: true,
    default: Date.now
  },
  // REFERÊNCIA À OUTRA(S) COLLECTIONS
  idMedico: {
    type: ObjectId,
    required: true,
    ref: "Medico"
  },
  idPaciente: {
    type: ObjectId,
    required: true,
    ref: 'Paciente'
  },

});

module.exports = mongoose.model('Atendimento', schema, 'atendimentos');
