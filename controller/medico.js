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
let Medico = require('../models/Medico');

let api = {
  getAll: getAll,
};

function getAll(req, res, next) {
  let cidade = req.query.cidade;
  let especialidade = req.query.especialidade;
  let nome = req.query.nome;
  let q = req.query.q;


  let query = {};

  if (!_.isEmpty(q)) {
    query["$or"] = [
      {"nome": new RegExp(q, 'i')},
      {"atendeEm": new RegExp(q, 'i')},
      {"especialidade": new RegExp(q, 'i')}
    ]
  }
  // query['idMedico'] = {$exists: true};
  if (!_.isEmpty(nome)) {
    query['nome'] = new RegExp(nome, 'i');
  }

  if (!_.isEmpty(cidade)) {
    query['atendeEm'] = new RegExp(cidade, 'i');
  }

  if (!_.isEmpty(especialidade)) {
    query['especialidade'] = new RegExp(especialidade, 'i');
  }

  console.log("quer", query)

  Medico.aggregate([

    {
      $lookup: {
        from: 'usuarios',
        localField: 'idUsuario',
        foreignField: '_id',
        as: 'usuario'
      }
    },
    {$unwind: "$usuario"},
    {
      $addFields: {
        "nome": "$usuario.nome"
      }
    },
    {
      $project: {
        "usuario": 0
      }
    },
    {$match: query},

  ]).exec()
    .then(function (_usuarios) {
      return res.status(200).json({
        data: _usuarios
      })
    }).catch(function (erro) {
    next(erro);
  })


  /*Usuario.find(query, {nome: true, idMedico: true, _id : false}).populate('idMedico').exec()
   .then(function (users) {
   return res.status(200).json({
   data: users
   })
   }).catch(function (erro) {
   next(erro);
   })*/
}
;


module.exports = api;
