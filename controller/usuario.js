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

      dados.idUsuario = _usuario._id;


      if (_usuario.idMedico) {
        return updateMedico(req, res, next)
      }

      if (dados.localizacao) {
        let temp = Object.assign({}, dados.localizacao);

        dados.localizacao = [
          temp.longitude,
          temp.latitude
        ]
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

        return next(erro)
      });
    }).catch(function (erro) {
    return next(erro);
  });
}

function getMedico(req, res, next) {
  let idUsuario = req.params.id;

  Medico.findOne({'idUsuario': idUsuario}).exec()
    .then(function (_medico) {
      if (!_medico) {
        return res.status(200).json({
          data: {}
        })
      }

      if (_medico.get('localizacao')) {
        _medico = _medico.toObject();

        let temp = Object.assign({}, _medico.localizacao);

        _medico.localizacao = {
          longitude: temp[0],
          latitude: temp[1]
        }
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

  if (dados.localizacao) {
    let temp = Object.assign({}, dados.localizacao);

    dados.localizacao = [
      temp.longitude,
      temp.latitude
    ];
  }

  Medico.findOneAndUpdate({idUsuario: idUsuario}, dados, {new: true}).exec()
    .then(function (_medico) {
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

  // dados.dtNascimento = moment(req.body.dtNascimento, ["DD/MM/YYYY", "DD-MM-YYYY", "x", "X"]);
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

  if (dados.localizacao) {
    let temp = Object.assign({}, dados.localizacao);
    dados.localizacao = [
      temp.longitude,
      temp.latitude,
    ]
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

  Paciente.findOne({'idUsuario': idUsuario}).exec()
    .then(function (_paciente) {

      if (!_paciente) {
        return res.status(200).json({
          data: {}
        })
      }


      if (_paciente.get('localizacao')) {

        _paciente = _paciente.toObject();

        let temp = Object.assign({}, _paciente.localizacao);

        _paciente.localizacao = {
          longitude: temp[0],
          latitude: temp[1]
        }
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

  if (dados.localizacao) {
    let temp = Object.assign({}, dados.localizacao);
    dados.localizacao = [
      temp.longitude,
      temp.latitude,
    ]
  }

  Paciente.findOneAndUpdate({idUsuario: idUsuario}, dados, {new: true, runValidators: true}).exec()
    .then(function (_paciente) {
      return res.status(200).json({
        data: _paciente
      })
    }).catch(function (erro) {

    return next(erro);
  })
}

module.exports = api;
