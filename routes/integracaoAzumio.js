/**
 * Created by Uiliam on 11/08/2017.
 */

'use strict';

let express = require('express');
let router = express.Router();
let request = require('request');
let Paciente = require('./../models/Paciente');
let moment = require('moment');

module.exports = function (ROUTER) {
  const pathAzumio = "https://api.azumio.com";
  const apiAzumio = "/api2";
  const pathAuthorizeAzumio = "/authorize?redirect_uri=";
  const pathLoginAzumio = "/login?redirect_uri=";
  const pathSubscriptionAzumio = "/subscriptions?url=";
  const apiLocal = "/api/v1";
  const pathIntegracaoAzumio = "/integracao/azumio/paciente";// /ID_PACIENTE
  const pathSalvarToken = "/saveToken";
  const callbackAzumio = "/callback";
  const uriGetDados = `${pathAzumio}${apiAzumio}/checkins`;

  function verificaToken(req, res, next) {
    let idPaciente = req.params.id;
    let pathLocal = `http:// ${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}`;
    if(!idPaciente){
      return next({message: "ID do paciente não informado", status: 403 })
    }

    Paciente.findById(idPaciente).exec()
      .then(function (paciente) {
        if (!paciente) {
          return next({message: "Paciente não localizado.", status: 403});
        }

        if (!paciente.get('integracoes.azumio.token')) {
          return res.redirect(`${pathAzumio}${pathLoginAzumio}${pathLocal}${apiLocal}${pathIntegracaoAzumio}/${idPaciente}/saveToken`);
        } else {
          req.paciente = paciente;
          req.token = paciente.integracoes.azumio.token;
          next();
        }
      })
  }

  router.get('/paciente/:id/saveToken', function (req, res, next) {

    let idPaciente = req.params.id;
    let token = req.query.oauth_token;

    Paciente.findByIdAndUpdate(idPaciente, {"integracoes.azumio.token": token}, {new: true}).exec()
      .then(function (paciente) {

        if (!paciente) {
          return next({'message': 'Paciente não encontrado', "status": 404})
        }

        if (token) {
          return res.redirect('/azumio/sucesso.html');
        } else {
          res.redirect(`${apiLocal}${pathIntegracaoAzumio}/${idPaciente}`);
        }

      }).catch(function (erro) {
      return next(erro);
    })

  });

  router.get('/paciente/:id', verificaToken, function (req, res, next) {

    if (req.paciente) {
      return res.redirect("/azumio/sucesso.html");
    }

  });

  router.get('/paciente/:id/atualizar', verificaToken, function (req, res, next) {

    if (req.paciente) {
      request({
        method: "GET",
        uri: uriGetDados,
        qs: {
          type: "heartrate"
        },
        headers: {
          'Authorization': `OAuth ${req.token}`
        }
      }, function (erro, response, body) {
        if (erro) {
          return next(erro);
        }

        if (response.statusCode === 200) {
          try {

            let retorno = JSON.parse(body);
            let azumio = {
              atualizadoEm: new Date(),
              dados: []
            };

            retorno.checkins.forEach(function (batimento) {
              azumio.dados.push({
                batimentos: batimento.value,
                dataLeitura: new Date(batimento.modified)
              });
            });

            req.paciente.integracoes.azumio.dados = azumio.dados;
            req.paciente.integracoes.azumio.atualizadoEm = azumio.atualizadoEm;
            req.paciente.save({new: true})
              .then(function (newPaciente) {
                res.json(newPaciente)
              });
          } catch (erro) {
            next({message: erro})
          }
        }
      })
    }
  });

  router.get('/', verificaToken);

  ROUTER.use('/integracao/azumio', router);

};


