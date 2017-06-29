/**
 * Created by Uiliam on 29/05/2017.
 */
/**
 * Created by Uiliam on 29/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let moment = require('moment');

let Usuario = require('../models/Usuario');
let Medico = require('../models/Medico');
let Paciente = require('../models/Paciente');

let api = {
  save: save,
  get: get,
  getAll: getAll,
  update: update,
  saveMedico: saveMedico,
  savePaciente: savePaciente
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
}
function get(req, res, next) {
  let id = req.params.id;

  Usuario.findById(id, {senha: false})
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
function saveMedico(req, res, next) {

  let dados = req.body;
  let idUsuario = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    let erro = new Error('O usuário informado é inválido');
    erro.status = 401;
    return next(erro);
  }

  Usuario.findById(idUsuario).exec()
    .then(function (_usuario) {

      if (!_usuario) {
        let erro = new Error('O usuário informado é inválido');
        erro.status = 401;
        return next(erro);
      }

      dados.idUsuario = _usuario._id;
      Medico.create(dados)
        .then(function (_usuario) {
          return res.json({data: _usuario})
        }).catch(function (erro) {
        // return res.json(erro)
        return next(erro)
      });
    }).catch(function (erro) {
    return next(erro);
  });
}
function update(req, res, next) {
  let id = req.params.id;
  let dados = req.body;

  dados.dtNascimento = moment(req.body.dtNascimento, ["DD/MM/YYYY", "DD-MM-YYYY", "x", "X"]);
  Usuario.findOneAndUpdate({'_id': id}, dados, {runValidators: true}).exec()
    .then(function (_usuario) {

      return res.status(204).json();

    }).catch(function (erro) {
    next(erro);
  })

}
function savePaciente(req, res, next) {

  let dados = req.body;
  let idUsuario = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    let erro = new Error('O usuário informado é inválido');
    erro.status = 401;
    return next(erro);
  }

  Usuario.findById(idUsuario).exec()
    .then(function (_usuario) {

      if (!_usuario) {
        let erro = new Error('O usuário informado é inválido');
        erro.status = 401;
        return next(erro);
      }

      dados.idUsuario = _usuario._id;

      Paciente.create(dados)
        .then(function (_usuario) {
          return res.json({
            data: _usuario
          })
        }).catch(function (erro) {
        return next(erro);
      });

    }).catch(function (erro) {
    return next(erro);
  });
}

module.exports = api;
