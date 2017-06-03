/**
 * Created by Uiliam on 28/05/2017.
 */

'use strict';
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const db = process.env.BANCO || "127.0.0.1:27017/medclick";
const options = {
  db : {safe : true},
  server : {
    auto_reconnect: true,
    poolSize: 5
  }
}

function conectaDB(uri){

  mongoose.connect('mongodb://'+uri,options);

  mongoose.connection.on('connected', function(){
    console.log('Conectado ao mongodb em ' + uri);
  });

  mongoose.connection.on('error', function(err){
    console.log('Erro ao conectar ao mongo... Erro:'+  err);
  });


  mongoose.connection.on('disconnected', function () {
    console.log('Desconectado do mongoDB');
  });

  mongoose.connection.on('open', function () {
    console.log('Conexão aberta mongoDB');
  });


  process.on('SIGINT', function () {
    mongoose.connection.close(function(){
      console.log('Conexao fechada pelo termino da aplicacao');
      process.exit(0);
    });
  });
};

module.exports = conectaDB(db);
