/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  paciente: {
    cpf: require('./../fields/field-cpf'),
    dt_nascimento: Date,
  }
});


module.exports = mongoose.model('Paciente', schema);