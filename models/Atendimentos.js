/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;


let schema = new Schema({
  idMedico: {type: ObjectId, required: true, ref: 'usuario.medico'},
  idPaciente: {type: ObjectId, required: true, ref: 'Usuario.paciente'},
  descricaoNecessidade: {type: String, required: true},
  localConsulta: require('./../fields/field-string-min-2-char-obrigatorio'),
  dataConsulta: require('./../fields/field-date-with-parser'),
  feedbackConsulta: require('./../fields/field-string-min-2-char'),
  situacao: {
    type: String, enum: ["EM_ABERTO", "CONFIRMADO", "CANCELADO", "ATENDIDO"],
    default: 'EM_ABERTO',
    required: true,
    trim: true
  },
  motivoCanelamento: {type: String},
  dataRegistro: {type: Date, required: true, default: Date.now}
});

// schema.pre('update', function (next) {
  // let self = this;
 // console.log('new idmedico', self._update.idMedico)
 //  console.log('old', this.isNew)
 //
 //  console.log('aaa', this._idMedico);
// next()

// if(this.isModified('idMedico') || this.isModified('idMedico')){
//   next(new Error('Os campos \'idMedico\' e \'idPaciente\' não podem ser alterados.'));
// }
//
//   Usuario.find().or([
//     {'paciente': {$exists: true}},
//     {'medico': {$exists: true}},
//   ]).exec()
//     .then(function (u) {
//
//       console.log('encontrado', u)
//       next()
//     }).catch(function (error) {
//
//   })
// });

  module.exports = mongoose.model('Atendimento', schema);