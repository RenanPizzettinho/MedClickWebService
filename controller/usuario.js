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
  getMedico: getMedico,
  updateMedico: updateMedico,
  savePaciente: savePaciente,
  getPaciente: getPaciente,
  updatePaciente: updatePaciente
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

function get (req, res, next) {
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

  Usuario.findByIdAndUpdate(idUsuario,{medico: dados}, {new: true}).exec()
    .then(function(usuario){
      return res.json(usuario)
    }).catch(function(erro){
      return next(erro)
  })

  return;
  Usuario.findById(idUsuario).exec()
    .then(function (_usuario) {

      if (!_usuario) {
        let erro = new Error('O usuário informado é inválido');
        erro.status = 401;
        return next(erro);
      }

      dados.idUsuario = _usuario._id;

      if(_usuario.idMedico){
      return updateMedico(req, res, next)
      }

      Medico.create(dados)
        .then(function (_medico) {

          _usuario.idMedico = _medico._id;

          _usuario.save().then(function () {
            return res.json({data: _medico})
          }).catch(function (erro) {
            return next(erro)
          })

        }).catch(function (erro) {
        // return res.json(erro)
        return next(erro)
      });
    }).catch(function (erro) {
    return next(erro);
  });
}

function getMedico(req, res, next) {
  let idUsuario = req.params.id;

  Medico.find({'idUsuario': idUsuario}).exec()
    .then(function (_medico) {
      if (!_medico) {
        return res.status(200).json({
          data: {}
        })
      }

      return res.status(200).json({
        data: _medico
      })

    }).catch(function (erro) {
    next(erro);
  })
}

function updateMedico(req, res, next) {

  let idUsuario = req.params.id;
  let dados = req.body;
console.log("Dados", dados)

  Medico.findOneAndUpdate({idUsuario: idUsuario}, dados, {new: true, overwrite: true}).exec()
    .then(function (_medico) {
      console.log('aqui')
      return res.status(200).json({
        data: _medico
      })
    }).catch(function (erro) {
    next(erro);
  })
}

function update(req, res, next) {
  let id = req.params.id;
  let dados = req.body;

  dados.dtNascimento = moment(req.body.dtNascimento, ["DD/MM/YYYY", "DD-MM-YYYY", "x", "X"]);
  Usuario.findOneAndUpdate({'_id': id}, dados, {runValidators: true, new: true}).exec()
    .then(function (_usuario) {

      return res.status(200).json({
        data: _usuario
      });

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
        .then(function (_paciente) {

          _usuario.idPaciente = _paciente._id;

          _usuario.save().then(function () {

            return res.json({
              data: _paciente
            })
          }).catch(function (erro) {
            return next(erro);
          })
        }).catch(function (erro) {
        return next(erro);
      });

    }).catch(function (erro) {
    return next(erro);
  });
}

function getPaciente(req, res, next) {
  let idUsuario = req.params.id;

  Paciente.find({'idUsuario': idUsuario}).exec()
    .then(function (_paciente) {
      if (!_paciente) {
        return res.status(200).json({
          data: {}
        })
      }

      return res.status(200).json({
        data: _paciente
      })

    }).catch(function (erro) {
    next(erro);
  })
}

function updatePaciente(req, res, next) {
  let idUsuario = req.params.id;
  let dados = req.body;

  Paciente.findOneAndUpdate({idUsuario: idUsuario}, dados, {new: true}).exec()
    .then(function (_paciente) {
      return res.status(200).json({
        data: _paciente
      })
    }).catch(function (erro) {
    next(erro);
  })
}

module.exports = api;
