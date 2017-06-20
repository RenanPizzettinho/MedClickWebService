/**
 * Created by Uiliam on 29/05/2017.
 */
/**
 * Created by Uiliam on 29/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let _ = require('lodash');

let Usuario = require('../models/Usuario');

let api = {
  getAll: getAll,
};

function getAll(req, res, next) {
  let cidade = req.query.cidade;
  let especialidade = req.query.especialidade;
  let nome = req.query.nome;


  let query = {};
  query['medico'] = {$exists: true};
  query['nome'] = new RegExp(nome, 'i');

  if (!_.isUndefined(cidade)) {
    query['medico.atendeEm'] = new RegExp(cidade, 'i');
  }

  if (!_.isUndefined(especialidade)) {
    query['medico.especialidade'] = new RegExp(especialidade, 'i');
  }

  Usuario.find(query, {nome: true, medico: true, _id : false}).exec()
    .then(function (users) {
      return res.status(200).json({
        data: users
      })
    }).catch(function (erro) {
    next(erro);
  })
};


module.exports = api;
