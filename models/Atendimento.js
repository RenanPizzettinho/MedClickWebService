/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;


let schema = new Schema({
  idMedico: {type: ObjectId, required: true, ref: "Medico"},
  idPaciente: {type: ObjectId, required: true, ref: 'Paciente'},
  descricaoNecessidade: require('./../fields/field-string-obrigatorio'),
  localizacao: require('./../fields/field-localizacao-obrigatorio'),
  endereco : {
    rua : require('./../fields/field-string'),
    cidade: require('./../fields/field-string'),
    estado : require('./../fields/field-string'),
    pais : require('./../fields/field-string'),
    cep: require('./../fields/field-string'),
  },
  complemento: require('./../fields/field-string'),
  dataConsulta: require('./../fields/field-date-with-parser'),
  feedbackConsulta: require('./../fields/field-string-min-2-char'),
  situacao: require('./../fields/field-enum-situacao'),
  motivoCancelamento: require('./../fields/field-string'),
  dataRegistro: require('./../fields/field-date-default-now')
});


module.exports = mongoose.model('Atendimento', schema, 'atendimentos');
