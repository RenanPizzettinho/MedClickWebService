/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

let MongooseError = require('mongoose').Error;
let mongoose = require('mongoose');



function errorHandler(res, err, mensagem, status) {
  let retorno = {};
  let erros = [];

  if (err instanceof MongooseError || err.name  === 'MongoError') {

    if (err.message instanceof Object) {
      mensagem = err.message.message;
      status = err.message.status;
      delete err.message;
    }

    switch (err.name) {
      case 'ValidationError':
        validationError();
        break;

      case 'CastError':
        castError();
        break;

      default:
        mongooseError();
    }

    retorno.errors = erros;
    return res.status(status || 400).json(retorno)

  } else {



    let obj = {};
    obj.tipo = err.name || "Erro";
    obj.mensagem = mensagem || err.message || "Erro interno no servidor."

    retorno.errors = [];
    retorno.errors.push(obj);

    return res.status(status || err.status || 500).json(retorno)
  }


  function validationError() {

    if (Object.keys(err.errors).length > 0) {

      Object.keys(err.errors).forEach(function (key) {

        let obj = {};
        let obj_erro = err.errors[key];

        if ("CastError" === obj_erro.name) {
          obj_erro.message = `O valor para o campo \"${obj_erro.path}\" deve ser um ${obj_erro.kind}.`;
        }



        obj.tipo = obj_erro.name;
        obj.nome_campo = key;
        obj.mensagem = obj_erro.message;

        erros.push(obj);
      })
    } else {

      mongooseError()
    }
  }

  function castError() {

    let errors = [];
    let obj = {};
    delete err.message;
    obj.tipo = err.name;
    obj.nome_campo = err.path;
    obj.mensagem = mensagem || `O valor para o campo \"${err.path}\" deve ser um ${err.kind}.`;

    erros.push(obj);
  }


  function mongooseError() {

    let obj = {};
    obj.tipo = err.name;

    // if(err.code === 11000){
    //   obj.mensagem = "Erro" + err.path;
    // }else {

    obj.mensagem = mensagem || err.message || "OOps.. Algum erro aconteceu."
    // }



    erros.push(obj)
  }
}
module.exports = errorHandler;