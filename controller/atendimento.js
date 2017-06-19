/**
 * Created by Uiliam on 16/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let Atendimento = require('../models/Atendimentos');

let api = {
  save: save,
  getAll: getAll,
  update: update
};


function save(req, res, next) {

  let dados = req.body;

  Atendimento.create(dados)
    .then(function (_atendimento) {

      return res.status(200).json({
        data: _atendimento
      })

    }).catch(function (erro) {
    return next(erro)
  });
}
function getAll(req, res, next) {

  let idPaciente = req.query.idPaciente;
  let idMedico = req.query.idMedico;
  let situacao = req.query.situacao;

  if (!idPaciente && !idMedico) {
    let erro = new Error('É obrigatório informar no parâmetro \'idMedico\' caso seja médico, ou \'idPaciente\' caso seja paciente.');
    erro.status = 403;
    return next(erro);
  }

  let query = {
    $or: [
      {idMedico: idMedico},
      {idPaciente: idPaciente}
    ],
    $and: [
      {situacao: new RegExp(situacao, 'i') || {$regex: '.*.*'}}
    ]
  };

  Atendimento.find(query).exec()
    .then(function (users) {
      return res.status(200).json({
        data: users
      })
    }).catch(function (erro) {
    next(erro);
  })
}
function update(req, res, next) {
  let idAtendimento = req.params.idAtendimento;
  let dados = req.body;
console.log('dados', dados)
  Atendimento.findOneAndUpdate({_id: idAtendimento}, dados).update().exec()
    .then(function(_atendimento){
      res.json({
        data: _atendimento
      })
    }).catch(function(erro){
      next(erro);
  })

}


module.exports = api;
