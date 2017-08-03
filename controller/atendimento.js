/**
 * Created by Uiliam on 16/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let async = require('async');
let ObjectId = mongoose.Types.ObjectId;
let _ = require('lodash');
let Atendimento = require('../models/Atendimento');
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
  let id = req.params.idContexto;
  let idPaciente = req.query.idPaciente;
  let idMedico = req.query.idMedico;
  let situacao = req.query.situacao;

  let query = {};

  query['$or'] = [
    {'idPaciente': ObjectId(id)},
    {'idMedico': ObjectId(id)}
  ];


  !_.isEmpty(idPaciente) ? query["idPaciente"] = ObjectId(idPaciente) : '';
  !_.isEmpty(idMedico) ? query["idMedico"] = ObjectId(idPMedico) : '';


  if (!_.isEmpty(situacao)) {
    query['situacao'] = situacao;
  }

  Atendimento.aggregate([
    {
      $match: query
    },
    {
      $lookup: {
        from: "usuarios",
        localField: "idMedico",
        foreignField: "idMedico",
        as: "medico"
      }
    },
    {
      $lookup: {
        from: "usuarios",
        localField: "idPaciente",
        foreignField: "idPaciente",
        as: "paciente"
      }
    },
    {$unwind: {path: "$medico", "preserveNullAndEmptyArrays": true}},
    {$unwind: {path: "$paciente", "preserveNullAndEmptyArrays": true}},

    {
      $addFields: {
        "nomeMedico": {$ifNull: ["$medico.nome", "<NOME NAO LOCALIZADO>"]},
        "nomePaciente": {$ifNull: ["$paciente.nome", "<NOME NAO LOCALIZADO>"]},
      }
    },
    {
      $project: {
        "medico": 0,
        "paciente": 0
      },
    }
  ]).exec()
    .then(function (_atendimento) {

        return res.status(200).json({
          data: _atendimento
        });
      }
    ).catch(function (erro) {
    next(erro);
  });
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
