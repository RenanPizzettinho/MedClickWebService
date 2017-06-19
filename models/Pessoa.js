/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  _id: false,
  cpf: require('./../fields/field-cpf'),
  dtNascimento: require('./../fields/field-date-with-parser')
});

module.exports = mongoose.model('Pessoa', schema);
