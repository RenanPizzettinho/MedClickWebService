/**
 * Created by Uiliam on 16/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let async = require('async');
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
  ];

  Atendimento.aggregate(
    [
      {"$unwind": "$idMedico"},
      {
        "$lookup": {
          "from": "User",
          "localField": "idMedico",
          "foreignField": "medico._id",
          "as": "resulting"
        }
      },

    ]).exec().then(function (atends) {
    console.log('res');
    res.json(atends)
  }).catch(function (erro) {
    next(erro);
  });

// Atendimento.find(query).exec()
//   .then(function (atendimento) {
//     let dados = [];
//

// async.every(atendimento, function (ele, callback) {
//     console.log('eleme', ele)
//   callback(null, ele);
//
// },function(err, val){
//   console.log('finalizou tudo', val, err)
// })

// atendimento.forEach(function(at){
//   Usuario.findOne({"medico._id": atendimento.idMedico}).exec()
//     .then(function (medico) {
//       at.nomeMedico = medico.nome;
//       dados.push(atendimento);
//     }).catch(function (erro) {
//     next(erro);
//   })
// });


// let dados = [];
// atendimento.forEach(function (_at) {
//   Usuario.findOne({"medico._id": _at.idMedico}, {"nome": true})
//     .exec()
//     .then(function (medico) {
//       _at.nomeMedico = medico.nome;
//       dados.push(_at);
//     }).catch(function () {
//   });
//
// })

// }).catch(function () {
// console.log('finaleira')
// })

// Atendimento.find(query).exec()
//   .then(function (atendimento) {
//
//     let dados = [];
//
//     atendimento.forEach(function (_at) {
//       Usuario.findOne({"medico._id": _at.idMedico}, {"nome": true})
//         .exec()
//         .then(function (medico) {
//           _at.nomeMedico = medico.nome;
//           dados.push(_at);
//         }).catch(function () {
//       });
//
//     })
//   }).catch(function (erro) {
//   next(erro);
// })
//

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
