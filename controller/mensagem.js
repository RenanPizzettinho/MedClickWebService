/**
 * Created by Uiliam on 16/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let _ = require('lodash');
let Mensagem = require('../models/Mensagem');

let api = {
  save: save,
  getAll: getAll,
  update: update
};

function save(req, res, next) {

  let dados = req.body;

  Mensagem.create(dados)
    .then(function (_mensagem) {
      return res.status(200).json({
        data: _mensagem
      })
    }).catch(function (erro) {
    return next(erro)
  });
}
function getAll(req, res, next) {
  let id = req.params.id;
  let lida = req.query.novas;
  let somenteRecebidas = req.query.somenteRecebidas === 'true';
  let somenteEnviadas = req.query.somenteEnviadas === 'true';
  let idAtendimento = req.query.idAtendimento;


  let query = {};

  if (!_.isUndefined(lida)) {
    lida = !(lida === 'true');
    lida ? query['lida'] = true : query['lida'] = false;
  }

  if (somenteRecebidas) {
    query['para'] = ObjectId(id);
  } else {
    somenteRecebidas = undefined;
  }

  if (somenteEnviadas) {

    query['de'] = id;
  } else {
    somenteEnviadas = undefined;
  }

  if (!_.isUndefined(idAtendimento)) {
    query['idAtendimento'] = ObjectId(idAtendimento);
  }

  if (!somenteRecebidas && !somenteEnviadas) {
    query['$or'] = [
      {'para': ObjectId(id)},
      {'de': ObjectId(id)}
    ]
  }

  console.log(query);

  Mensagem.aggregate([

    {$match: query}
  ]
  ).exec()
    .then(function (users) {
      return res.status(200).json({
        data: users
      })
    }).catch(function (erro) {
    next(erro);
  })
}
function update(req, res, next) {
  let id = req.params.id;
  let dados = req.body;

  Mensagem.findOneAndUpdate({_id : id}, dados).update().exec()
    .then(function(_mensagem){
      res.status(200).json({
        data: _mensagem
      })
    }).catch(function(erro){
      next(erro);
  })
}

module.exports = api;
