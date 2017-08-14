/**
 * Created by Uiliam on 28/05/2017.
 */

'use strict';
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var db = process.env.BANCO || "127.0.0.1:27017/medclick";
// db = "admin:petro2310@keyword-prod-shard-00-00-6wewt.mongodb.net:27017,keyword-prod-shard-00-01-6wewt.mongodb.net:27017,keyword-prod-shard-00-02-6wewt.mongodb.net:27017/medclick?ssl=true&replicaSet=Keyword-PROD-shard-0&authSource=admin";

const options = {
    poolSize: 5,
    reconnectTries: 30,
  keepAlive : true
  // db : {safe : true},
  // useMongoClient: true,
  // mongos: true,
  // db: {native_parser: true},
  // replset: {
  //   rs_name: "Keyword-PROD-shard-0",
    // socketOptions: {
    //   keepAline: true
    // }
  // },
  // server: {
  //   user: "admin",
  //   pass: "petro2310",
  // }
};

function conectaDB(uri) {

  mongoose.connection.openUri('mongodb://' + uri, options).then(function () {
    const admin = new mongoose.mongo.Admin(mongoose.connection.db);

    admin.buildInfo(function(err, info){
      if(err){
        console.err('Erro ao obter MONGODB info: ', err);
      }else{
        console.log('Conexao com MongoDB ( version ', info.version, ') aberta com sucesso.');
      }
    });

  }).catch(function(erro){
    console.error('Erro ao se conectar ao MongoDB.', erro)
  });

  // mongoose.connection.openUri('mongodb://' + uri, options);

  mongoose.connection.on('connected', function () {
    console.log('Conectado ao mongodb');
  });


  mongoose.connection.on('error', function (err) {
    console.log('Erro ao conectar ao mongo... Erro:' + err);
  });


  mongoose.connection.on('disconnected', function () {
    console.log('Desconectado do mongoDB');
  });

  // mongoose.connection.on('open', function () {
  //   console.log('Conexão aberta mongoDB');
  // });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Conexao fechada pelo termino da aplicacao');
      process.exit(0);
    });
  });
};

module.exports = conectaDB(db);
