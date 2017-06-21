/**
 * Created by Uiliam on 16/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let _ = require('lodash');
let Atendimento = require('../models/Atendimentos');
let Usuario = require('../models/Usuario');

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
  let id = req.params.id;
  let idPaciente = req.query.idPaciente;
  let idMedico = req.query.idMedico;
  let situacao = req.query.situacao;

  let query = {};

  if (!_.isUndefined(idPaciente)) {
    query['idPaciente'] = idPaciente
  }

  if (!_.isUndefined(idMedico)) {
    query['idMedico'] = idMedico
  }

  if (!_.isUndefined(situacao)) {
    query['situacao'] = situacao;
  }

  query['$or'] = [
    {idMedico: id},
    {idPaciente: id}
  ]

  Atendimento.find(query).exec()
    .then(function (atendimento) {

      return res.status(200).json({
        data: atendimento
      })

    }).catch(function (erro) {
    next(erro);
  })
}
function update(req, res, next) {
  let idAtendimento = req.params.idAtendimento;
  let dados = req.body;

  Atendimento.findOneAndUpdate({_id: idAtendimento}, dados).update().exec()
    .then(function (_atendimento) {
      res.json({
        data: _atendimento
      })
    }).catch(function (erro) {
    next(erro);
  })

}


module.exports = api;
