/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  possuiDiabete: {
    type: Boolean,
    required: true,
  },
  possuiPressaoAlta: {
    type: Boolean,
    required: true,
  },
  localizacao: {
    type: [
      {
        type: Number,
      }
    ],
    index: '2dsphere',
  },
  endereco: {
    rua: {
      type: String,
    },
    cidade: {
      type: String,
    },
    estado: {
      type: String,
    },
    pais: {
      type: String,
    },
    cep: {
      type: String,
    },
  },
  integracoes: {
    azumio: {
      token: {
        type: String,
      },
      atualizadoEm: {
        type: Date,
      },
      dados: [{
        _id: false,
        batimentos: {
          type: Number,
        },
        dataLeitura: {
          type: Date,
        },
      }]
    },
  },
  // REFERÊNCIA À OUTRA(S) COLLECTIONS
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});


module.exports = mongoose.model('Paciente', schema);

