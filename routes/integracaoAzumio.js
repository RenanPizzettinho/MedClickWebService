/**
 * Created by Uiliam on 11/08/2017.
 */

'use strict';

let express = require('express');
let router = express.Router();
let request = require('request');
let http = require('http');
let Paciente = require('./../models/Paciente');
let moment = require('moment');
module.exports = function (ROUTER) {
  const pathAzumio = "https://api.azumio.com";
  const apiAzumio = "/api2";
  const pathAuthorizeAzumio = "/authorize?redirect_uri=";
  const pathLoginAzumio = "/login?redirect_uri=";
  const pathSubscriptionAzumio = "/subscriptions?url=";
  const pathLocal = "http://localhost:3000";
  const apiLocal = "/api/v1";
  const pathIntegracaoAzumio = "/integracao/azumio/paciente";// /ID_PACIENTE
  const pathSalvarToken = "/saveToken";
  const callbackAzumio = "/callback";
  const uriGetDados = `${pathAzumio}${apiAzumio}/checkins`;

  //https://api.azumio.com/api2/authorize?redirect_uri=http://www.example.com&client_id=org.organization.example

  // GET (/api/v1/integracao/azumio/paciente/:id/atualizar)
  //atualizacao dados
  // GET (/api/v1/integracao/azumio/paciente/:id/atualizar)

  router.get('/paciente/:id/saveToken', function (req, res, next) {
    console.log('chamando save token')
    let idPaciente = req.params.id;
    let token = req.query.oauth_token;

    if (token) {
      Paciente.findByIdAndUpdate(idPaciente, {"integracoes.azumio.token": token}, {new: true}).exec()
        .then(function (paciente) {
          res.redirect('/azumio/sucesso.html');
        }).catch(function (erro) {
        return next(erro);
      })
    } else {
      res.redirect(`${apiLocal}${pathIntegracaoAzumio}/${idPaciente}`);
    }
  });

  router.get('/paciente/:id', function (req, res, next) {
    verificaIntegracao(req, res, next)
      .then(function (dados) {

        if (!res.finished) {
          return res.redirect("/azumio/sucesso.html");
        }
      }).catch(function (erro) {

      return next(erro)
    })
  });

  router.get('/paciente/:id/atualizar', function (req, res, next) {


    verificaIntegracao(req, res)
      .then(function (dados) {

        request({
          method: "GET",
          uri: uriGetDados,
          qs: {
            type: "heartrate"
          },
          headers: {
            'Authorization': `OAuth ${dados.token}`
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

              let maiorData;
              retorno.checkins.forEach(function (batimento) {
                // if (!maiorData) {
                //   maiorData = batimento.modified;
                // } else {
                //   maiorData = moment(maiorData, 'x').isAfter(moment(batimento.modified), 'x') ? maiorData : batimento.modified;
                // }

                azumio.dados.push({
                  batimentos: batimento.value,
                  dataLeitura: new Date(batimento.modified)
                });

                // console.log()

                // dados.paciente.save();
                // console.log('modified', moment(batimento.modified, 'x').format('DD/MM/YYYY HH:mm:ss'));
                // console.log('timestam', moment(batimento.timestamp, 'x').format('DD/MM/YYYY HH:mm:ss'));
                // console.log('creat', moment(batimento.created, 'x').format('DD/MM/YYYY HH:mm:ss'));
              });

              dados.paciente.integracoes.azumio = azumio.dados;
              console.log(dados.paciente)

              Paciente.findById(dados.paciente._id).exec()
                .then(function (paciente) {
                  paciente.integracoes.azumio.dados = azumio.dados;

                  paciente.save({new: true})
                    .then(function (newPaciente) {
                      res.json(newPaciente)
                    });
                }).catch(function (erro) {

              })
              // console.log('maiorData', moment(maiorData, 'x').format('DD/MM/YYYY HH:mm:ssó'))
            } catch (erro) {
              // console.log(erro)
              next({message: erro})
            }


          }
        })

      }).catch(function (erro) {
      return next(erro)
    })


  });

  router.post('/paciente/:id/callback', function (req, res, next) {

    let idPaciente = req.params.id;


    Paciente.findById(idPaciente).exec()
      .then(function (paciente) {

        console.log('Aqq', idPaciente)
        console.log('Aqq', paciente)

        let options = {
          method: "GET",
          url: `https://api.azumio.com/api2/checkins?type=heartrate&_headers={Authentication: OAuth ${paciente.integracoes.azumio.token}}`,
        };


        if (!paciente) {
          throw new Error('Paciente não encontrado.')
        }

        request(options, function (err, response, body) {

          if (response.statusCode === 200) {
            console.log("atualizado dados via post azumio", new Date());
            let dados = JSON.parse(body);
            let batimentos = [];
            if (dados.checkins) {
              dados.checkins.forEach(function (v) {
                batimentos.push({
                  dataMedicao: new Date(v.modified),
                  data: new Date(),
                  valor: v.value
                })
              })
            }
            paciente.integracoes.azumio.dados = batimentos;

            console.log('Aq', paciente)
            paciente.save({rewrite: true}).then(function () {
              console.log('Paciente salvo com sucesso', paciente)
            })
            res.status(200).end();
          }
        })
      }).catch(function (erro) {
      return next(erro);
    });
    // https://api.azumio.com/api2/checkins?type=heartrate&_headers={Authentication: OAuth 130182408332d15386841d7e677101ec51877d23a0636bd9352}
    // res.end();
  });


  router.get('/', function (req, res, next) {
    console.log("caiu no /");
    let token = req.query.oauth_token;
    console.log('tolen', token)
    res.send('OK OK')
  })
  ROUTER.use('/integracao/azumio', router);

  function verificaIntegracao(req, res, next) {
    return new Promise(function (resolve, reject) {

      let idPaciente = req.params.id;
      Paciente.findById(idPaciente).exec()
        .then(function (paciente) {
          if (!paciente) {
            return reject({message: "Paciente não localizado.", status: 403});
          }

          if (!paciente.get('integracoes.azumio.token')) {
            resolve();
            return res.redirect(`${pathAzumio}${pathLoginAzumio}${pathLocal}${apiLocal}${pathIntegracaoAzumio}/${idPaciente}/saveToken`);
          } else {
            return resolve({token: paciente.integracoes.azumio.token, paciente: paciente});
          }
        }, reject);
    })
  }

};


