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

let Paciente = require('../models/Paciente');

let api = {
  getById: getById
};

function getById(req, res, next) {
  let id = req.params.id;

  Paciente.findById(id).exec()
    .then(function (paciente) {
      if(paciente.localizacao){
        paciente = paciente.toObject();

        let temp = Object.assign({}, paciente.localizacao);

        paciente.localizacao = {
          longitude : temp[0],
          latitude : temp[1]
        }
      }

      return res.json({
        data: paciente
      })

    }).catch(function (erro) {
    next(erro)
  })

}

module.exports = api;
