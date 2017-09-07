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
  let atendeEm = req.query.atendeEm;
  let especialidade = req.query.especialidade;
  let nome = req.query.nome;
  let q = req.query.q;

  let posicao = [
    Number(req.query.longitude) || 0,
    Number(req.query.latitude) || 0
  ];

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

  if (!_.isEmpty(atendeEm)) {
    query['atendeEm'] = new RegExp(atendeEm, 'i');
  }

  if (!_.isEmpty(especialidade)) {
    query['especialidade'] = new RegExp(especialidade, 'i');
  }

  Medico.aggregate([
    {
      "$geoNear": {
        "near": {
          "type": "Point",
          "coordinates": posicao // [longitude, latitude]
        },
        "distanceField": "distancia",
        "limit": 100000,
        "spherical": true
      }
    },
    {
      "$redact": {
        "$cond": {
          "if": {"$lt": ["$distancia", "$distanciaMaxima"]},
          "then": "$$KEEP",
          "else": "$$PRUNE"
        }
      }
    },
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
      $project: {
        "_id": 1,
        "crm": 1,
        "estado": 1,
        "especialidade": 1,
        "atendeEm": 1,
        "idUsuario": 1,
        "diasAtendimentoDomicilio": 1,
        "nome": "$usuario.nome",
        "distancia": 1,
        "localizacao": {
          $reduce: {
            input: "$localizacao",
            initialValue: "",
            in: {
              longitude: {$arrayElemAt: ["$localizacao", 0]},
              latitude: {$arrayElemAt: ["$localizacao", -1]},
            }
          }
        },
        "endereco": 1
      }
    },
    {$match: query},

  ]).exec()
    .then(function (_medicos) {
      return res.status(200).json({
        data: _medicos
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

function getByLocation(req, res, next) {
  let posicao = [
    req.body.posicao.longitude || 0,
    req.body.posicao.latitude || 0
  ];


  Medico.aggregate(
    [
      {
        "$geoNear": {
          "near": {
            "type": "Point",
            "coordinates": posicao // [longitude, latitude]
          },
          "distanceField": "distancia",
          "limit": 100000,
          "spherical": true
        }
      },
      {
        "$redact": {
          "nomes": "$nome",
          "$cond": {
            "if": {"$lt": ["$distancia", "$distanciaMaxima"]},
            "then": "$$KEEP",
            "else": "$$PRUNE"
          }
        }
      },
    ], function (err, results) {
      // Work with results in here
      console.log(results)
    }
  );

}


module.exports = api;
