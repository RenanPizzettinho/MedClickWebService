/**
 * Created by Uiliam on 16/05/2017.
 */

"use strict";


let request = require('request');
let Paciente = require('./../models/Paciente');


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

let api = {
    getInfo: getInfo,
    saveToken: saveToken,
    atualizar: atualizar
};

function saveToken(req, res, next) {

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

}

function atualizar(req, res, next) {

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
}

function getInfo(req, res, next) {

    if (req.paciente) {
        return res.redirect("/azumio/sucesso.html");
    }
}

module.exports = api;
