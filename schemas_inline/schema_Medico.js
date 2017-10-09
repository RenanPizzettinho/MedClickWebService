/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  crm: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  atendeEm: {
    type: String,
    required: true,
  },
  especialidade: {
    type: String,
    required: true,
  },
  diasAtendimentoDomicilio: [
    {
      type: String,
      enum: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
      required: true,
    }
  ],
  localizacao: {
    type: [
      {
        type: Number,
      }
    ],
    index: '2dsphere'
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
  distanciaMaxima: {
    type: Number,
  },
  // REFERÊNCIA À OUTRA(S) COLLECTIONS
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
});

module.exports = mongoose.model('Medico', schema);
