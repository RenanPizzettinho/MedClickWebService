/**
 * Created by Uiliam on 29/05/2017.
 */
/**
 * Created by Uiliam on 29/05/2017.
 */

"use strict";

let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;

let Usuario = require('../models/Usuario');
let Medico = require('../models/Medico');
let Paciente = require('../models/Paciente');

let api = {
  save: save,
  get: get,
  getAll: getAll,
  update: update,
  saveMedico: saveMedico,
  savePaciente: savePaciente,
  savePessoa: savePessoa
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
  let id = req.params.id;
  let dados = req.body;

  Usuario.findOne({'_id': id}).exec()
    .then(function (_usuario) {

      _usuario.paciente = dados.paciente;
      _usuario.medico = dados.medico;

      return _usuario.save().then(function (usuario) {
        return res.json({
          data: usuario
        })
      }).catch(function (erro) {

        return next(erro);
      })

      return res.status(200).json({
        data: _usuario
      })
    }).catch(function (erro) {
    next(erro);
  })

}
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

      _usuario.medico = dados;

      _usuario.save()
        .then(function (_usuario) {
          return res.json({data: _usuario})
        }).catch(function (erro) {
        // return res.json(erro)
        return next(erro.errors.medico)
      });

    }).catch(function (erro) {
    return next(erro);
  });
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

      _usuario.paciente = dados;

      _usuario.save()
        .then(function (_usuario) {
          return res.json({
            data: _usuario
          })
        }).catch(function (erro) {
        return next(erro.errors.paciente || erro);
      });

    }).catch(function (erro) {
    return next(erro);
  });
}

function savePessoa(req, res, next) {

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


      _usuario.pessoa = dados;

      _usuario.save()
        .then(function (_usuario) {
          console.log('save', _usuario)
          return res.json({
            data: _usuario
          })
        }).catch(function (erro) {

        return next(erro.errors.pessoa || erro);
      });

    }).catch(function (erro) {

    return next(erro);
  });
};

module.exports = api;
