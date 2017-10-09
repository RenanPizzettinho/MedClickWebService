/**
 * Created by Uiliam on 29/05/2017.
 */
"use strict";

let mongoose = require('mongoose');
let mail = require('./../config/mail');
let async = require('async');
let crypto = require('crypto');
let User = require('../models/Usuario');

let api = {
  logar: logar,
  solicitarSenha: solicitarSenha,
  redefinirSenha: redefinirSenha,

};



function logar(req, res, next) {

  let dados = req.body;

  User.findOne({email: dados.email, senha: dados.senha}, {
    email: true,
    nome: true,
    _id: true,
    idMedico: true,
    idPaciente: true
  })
    .exec()
    .then(function (user) {
      if (!user) {
        let erro = new Error('E-mail ou senha inválidos !');
        erro.status = 403;
        throw erro;
      }
      return res.status(200).json({
        data: user
      });
    }).catch(function (erro) {
    return next(erro);
  })
}
function solicitarSenha(req, res, next) {
  let email = req.body.email;

  async.waterfall([

    function (done) {
      User.findOne({email: email}).exec()
        .then(function (user) {
          if (!user) {
            throw new Error('E-mail não encontrado.');
          }
          done(null, user);
        }).catch(function (erro) {
        done(erro, null)
      })
    },
    function (user, done) {
      crypto.randomBytes(40, function (erro, buf) {

        let token = buf.toString('hex');
        done(erro, user, token)
      })
    }, function (token, done) {

    }
  ], function (erro) {
    next(erro)
  });

  User.findOne({email: email}).exec()
    .then(function (user) {
      if (!user) {
        return res.status(401).json({
          errors: [
            {
              tipo: "Erro",
              mensagem: "E-mail não cadastrado."
            }
          ]
        });
      }

      return res.send('s');
      if (user) {
        let mensagem = `<div style="width: 50%; margin: 0 auto; padding: 10px 40px 50px 40px; background-color:#f2f2f2">
    <h2>Olá ${user.nome}</h2>
    <h4>Redefinição de senha</h4>

    <p>Conforme solicitado, segue abaixo link onde você consegue efetuar a
        alteração de sua senha de acesso ao sistema
        <stong>MedClick</stong>
    </p>
    <div style="margin:50px;">
        <a href=""
           style="margin:0 auto; padding: 20px 100px; text-decoration: none;color: #ffffff; background-color: #0E3D4C;">
            REDEFINA SUA SENHA
        </a>
    </div>
</div>
</body>
</html>
        `;

        mail.enviarEmail(user.email, 'MedClick - Redefinição de senha', mensagem, function (error, info) {
          if (error) {
            return res.status(400).json({
              errors: [
                {
                  tipo: "Erro",
                  mensagem: "Erro ao enviar e-mail",
                  erro: error
                }
              ]
            })
          }

          return res.status(200).json({
            data: {
              mensagem: "E-mail enviado com sucesso !"
            }
          });
        });
      }
    }).catch(function (erro) {
    next(erro);
  })
}
function redefinirSenha(req, res, next) {

  let token = req.query.token;

  User.findOne({hash: hash}).exec()
    .then(function (user) {

    }).catch(function (error) {

  })

}

module.exports = api;