/**
 * Created by Uiliam on 11/08/2017.
 */

'use strict';

let express = require('express');
let router = express.Router();
let request = require('request');
let http = require('http');
let Paciente = require('./../models/Paciente');

module.exports = function (ROUTER) {

//https://api.azumio.com/api2/subscriptions?url=http://www.example.com/callback/user/1?type=steps,sleeptime

  router.get('/paciente/:id/saveToken', function (req, res, next) {
    let idPaciente = req.params.id;
    let token = req.query.oauth_token;
    let options = {
      method : "POST",
      url:  `https://api.azumio.com/api2/subscriptions?url=http://medclick.herokuapp.com/api/v1/integracao/azumio/callback/paciente/${idPaciente}?type=heartrate`
    };

    if (token) {
      Paciente.findByIdAndUpdate(idPaciente, {"integracoes.azumio.token": token},{new: true}).exec()
        .then(function(paciente){

            request(options, function(err, response, body){
                if(response.statusCode === 200){
                  console.log("token salvo");
                  res.redirect('/azumio/sucesso.html');
                }else{
                  console.log("erro salvar token");
                  res.redirect('/azumio/erro.html')
                }
            })
        }).catch(function(erro){
          return next(erro);
      })
    }else{
      res.redirect(`/api/v1/integracao/azumio/paciente/${idPaciente}`);
    }
  });

  router.get('/paciente/:id', function (req, res, next) {
    let idPaciente = req.params.id;

    Paciente.findById(idPaciente).exec()
      .then(function (paciente) {


        if (!paciente) {
          return next(new Error('Paciente não localizado.'));
        }

        if (!paciente.get('integracaoAzumio.token')) {
          return res.redirect(`https://api.azumio.com/login?redirect_uri=http://medclick.herokuapp.com/api/v1/integracao/azumio/paciente/${idPaciente}/saveToken`);
        }
        res.redirect("/")

      }).catch(function (erro) {
      next(erro);
    })
  });
//https://api.azumio.com/api2/subscriptions?url=http://www.example.com/callback/user/1?type=steps,sleeptime


  router.post('/callback/paciente/:id', function(req, res, next){
    let idPaciente = req.params.id;
    let options = {
      method: "GET",
      url: `https://api.azumio.com/api2/checkins?type=heartrate&_headers={Authentication: OAuth ${paciente.integracao.azumio.token}}`
    };

    Paciente.findById(idPaciente).exec()
      .then(function(paciente){

       request(options, function(err, response, body){
         if(response.statusCode === 200){
           console.log("atualizado dados via post azumio", new Date());
            paciente.integracoes.azumio.dados = body;
         }
       })
    }).catch(function(erro){
      return next(erro);
    });
    // https://api.azumio.com/api2/checkins?type=heartrate&_headers={Authentication: OAuth 130182408332d15386841d7e677101ec51877d23a0636bd9352}
    res.end();
  });


  ROUTER.use('/integracao/azumio', router);
};