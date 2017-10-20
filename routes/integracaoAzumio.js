/**
 * Created by Uiliam on 11/08/2017.
 */

'use strict';

let express = require('express');
let router = express.Router();
let Paciente = require('./../models/Paciente');
let Azumio = require('./../controller/integracaoAzumio');

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

module.exports = function (ROUTER) {

    // verifica se usuario possui token de integração com Azumio
    function verificaToken(req, res, next) {
        let idPaciente = req.params.id;
        let pathLocal = `http://${req.hostname === 'localhost' ? 'localhost:3000' : req.hostname}`;
        if (!idPaciente) {
            return next({message: "ID do paciente não informado", status: 403})
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

    router.get('/', verificaToken);

    router.get('/paciente/:id/saveToken', Azumio.saveToken);

    router.get('/paciente/:id', verificaToken, Azumio.getInfo);

    router.get('/paciente/:id/atualizar', verificaToken, Azumio.atualizar);

    ROUTER.use('/integracao/azumio', router);

};


