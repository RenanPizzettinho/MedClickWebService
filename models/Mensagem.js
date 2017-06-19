/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let schema = new Schema({
  de: {type: ObjectId, required: true},
  para: {type: ObjectId, required: true},
  idAtendimento: {type: ObjectId, required: false, ref: 'Atendimento'},
  mensagem: require('./../fields/field-string-min-2-char-obrigatorio'),
  lida: require('./../fields/field-boolean-obrigatorio-default-false'),
  respondido: require('./../fields/field-boolean-obrigatorio-default-false'),
  dataEnvio: require('./../fields/field-date-default-now')
});

// schema.pre('save', function (next) {
  // let self = this;
  // console.log('perfil:', this)
  //
  // Usuario.find().or([
  //   {'paciente': {$exists: true}},
  //   {'medico': {$exists: true}},
  // ]).exec()
  //   .then(function (u) {
  //
  // console.log('encontrado', u)
  // next()
  // }).catch(function (error) {
  //
  // })

// })

module.exports = mongoose.model('Mensagem', schema, 'mensagens');