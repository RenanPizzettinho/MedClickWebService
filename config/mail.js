/**
 * Created by Uiliam on 31/05/2017.
 */

'use strict';
let nodemailer = require('nodemailer');

let api = {
  enviarEmail: enviarEmail
};

const transporte = nodemailer.createTransport({
  host : 'smtps.bol.com.br',
  port: 587,
  secure: false,
  auth: {
    user: 'user',
    pass: 'pass'
  },
  tls: {
    rejectUnauthorized: false
  }
});

function enviarEmail(_para, _assunto, _texto, callback) {
  callback = callback || function(){};

  transporte.verify(function (err, sucess) {
    if (err){
      return callback(err, null);
    };

    let email = {
      from: transporte.transporter.options.auth.user,
      to: _para,
      subject: _assunto,
      html: _texto
    }

    transporte.sendMail(email, function (err, info) {
      if (err){
        return callback(err, null);
      }
      console.log('Email enviado com sucesso: ', info);
      return callback(null, info);
    })

  });

};

module.exports = api;
