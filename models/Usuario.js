/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let medicoSchema = require('./Medico');
let pacienteSchema = require('./Paciente');

let schema = new Schema({
  nome: require('./../fields/field-string-min-2-char-obrigatorio'),
  email: require('./../fields/field-email'),
  senha: require('./../fields/field-senha'),
  cpf: require('./../fields/field-cpf'),
  dtNascimento: require('./../fields/field-date-with-parser'),
  medico : medicoSchema.schema,
  paciente: pacienteSchema.schema,
  // idMedico: {type: Schema.Types.ObjectId, ref: 'Medico'},
  // idPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
  criadoEm: require('./../fields/field-criado-em'),
  location : {
    type: [Number],
    index: '2d'
  }
});


module.exports = mongoose.model('Usuario', schema, 'usuarios');

// mongoose.model('Usuario').findByIdAndUpdate("59878d43a54a980ca013240e", {"location" : [50,50]})
//   .exec().then(function(v){console.log('Atualizado', v)}).catch(function(e){console.log(e)});

// schema.pre('findOneAndUpdate', function (next) {
// console.log('executando pre')
// this.options.runValidators = true;
// next();
// })
