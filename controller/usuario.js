/**
 * Created by Uiliam on 29/05/2017.
 */
/**
 * Created by Uiliam on 29/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
let Usuario = require('../models/Usuario');
let Medico = require('../models/Medico');

let api = {
  save: save,
  get: get,
  getAll: getAll,
  update: update,
  saveMedico: saveMedico
};

function save(req, res, next) {
  let dados = req.body;

  Usuario.create(dados)
    .then(function (_user) {
      res.status(200).json({
        data: _user
      })
    }).catch(function (erro) {
    return next(erro)
  });
};
function get(req, res, next) {
  let id = req.params.id;

  Usuario.findById(id)
    .then(function (_user) {
      return res.status(200).json({
        data: _user
      })
    }).catch(function (erro) {
    return next(erro);
  })
};
function getAll(req, res, next) {
  Usuario.find({}, {senha: false, __v: false}).exec()
    .then(function (users) {
      return res.status(200).json({
        data: users
      })
    }).catch(function (erro) {
    next(erro);
  })
};
function update(req, res, next) {
  //todo
};

function saveMedico(req, res, next) {

  let dados = req.body;
  let idUsuario = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    let erro = new Error('O usuário informado é inválido');
    erro.status = 401;
    throw erro;
  }

  Usuario.findById(idUsuario).exec()
    .then(function (_usuario) {

      if (!_usuario) {
        let erro = new Error('O usuário informado é inválido');
        erro.status = 401;
        throw erro;
      }

      let medico = new Medico(dados);
      medico.validate(function (_erro) {
        if (_erro) {
          next(_erro);
        }

        _usuario.medico = medico;
        return _usuario.save(function (erro) {
          if (erro) {
            throw erro;
          }

          res.status(200).json({
            data: _usuario
          })
        });
      });
    });
};

module.exports = api;
