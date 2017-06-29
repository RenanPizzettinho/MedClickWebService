/**
 * Created by Uiliam on 23/06/2017.
 */

'use strict';

let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let _ = require('lodash');
let Usuario = require('./models/Usuario');
let Medico = require('./models/Medico');
let Paciente = require('./models/Paciente');
let async = require('async');
let await = require('await');
let promisify = require('promisify');
let Promise = require('bluebird');


// return
mongoose.connection.on('connected', function () {
  console.log('\n\n\n######   REALIZANDO AJUSTE NAS COLLECTIONS DEVIDO A ALTERACAO NOS MODELS   ######## (Uiliam)\n');

  let Usuarios = mongoose.connection.db.collection('usuarios');

  async.series([
    function (callback) {

      mongoose.connection.db.collection("users", function (err, collection) {
        if (err) {
          callback(err, null);
        }

        collection.find().toArray().then(function (dados) {
          async.each(dados, function (user, callback) {

            async.series([
                function (callback) {
                  if (user.hasOwnProperty('medico')) {
                    user.medico.idUsuario = user._id;

                    Medico.create(user.medico).then(function () {

                      user.idMedico = user.medico._id;
                      delete (user.medico);

                      callback(null, {mensagem: "- Usuario com ID " + user._id + " desmembrado o medico"});

                    }).catch(function (erro) {
                      callback(null, {mensagem: "- Erro ao criar perfil medico do usuario " + user._id});
                    })
                  } else {
                    callback(null, {mensagem: "- Usuario " + user._id + " não possui perfil médico incorporado"})
                  }
                },
                function (callback) {

                  if (user.hasOwnProperty('paciente')) {
                    user.paciente.idUsuario = user._id;

                    Paciente.create(user.paciente).then(function () {

                      user.idPaciente = user.paciente._id;
                      delete (user.paciente);

                      return callback(null, {mensagem: "Usuario com ID " + user._id + " desmembrado o paciente"});

                    }).catch(function (erro) {

                      return callback(null, {mensagem: "Erro ao criar perfil paciente do usuario " + user._id});

                    })

                  } else {

                    return callback(null, {mensagem: "- Usuario " + user._id + " não possui perfil paciente incorporado"})

                  }
                },
                function (callback) {
                  if (user.hasOwnProperty('pessoa')) {
                    user.pessoa.idUsuario = user._id;

                    user.cpf = user.pessoa.cpf;
                    user.dtNascimento = user.pessoa.dtNascimento;
                    delete (user.pessoa);

                    return callback(null, {mensagem: "Usuario com ID " + user._id + " desmembrado a pessoa"});
                  } else {
                    return callback(null, {mensagem: "- Usuario " + user._id + " não possui perfil pessoa incorporado"})
                  }
                },

                // atualiza dados da collection users
                function (callback) {
                  collection.update(
                    {"_id": user._id},
                    user,
                    function (err, dados) {

                      if (err) {
                        return callback(err, null);
                      }
                      return callback(null, {"atualizado": dados.result.nModified > 0});
                    }
                  )
                },
              ],
              function (erros, resultados) {
                console.log(resultados[0].mensagem);
                console.log(resultados[1].mensagem);

                if (erros) {
                  console.log(erros.message);
                }
                console.log('\n');
                callback();
              }
            );

          }, function (err) {
            if (err) {
              console.log('Erro ao atualizar collection \"users\"');
              callback();
            } else {
              console.log('Atualização da collection \"users\" finalizado !!');
              callback();
            }
          })
        });
        /*
         collection.find().forEach(function (user) {
         async.series([
         function (callback) {

         if (user.hasOwnProperty('medico') && user._id == "5944bd3677e33826242e2745") {
         user.medico.idUsuario = user._id;

         Medico.create(user.medico).then(function () {

         user.idMedico = user.medico._id;
         delete (user.medico);

         return callback(null, {mensagem: "Usuario com ID " + user._id + " desmembrado o medico"});

         }).catch(function (erro) {

         return callback(null, {mensagem: "Erro ao criar perfil medico do usuario " + user._id});

         })

         } else {

         return callback(null, {mensagem: "Usuario " + user._id + " não possui perfil médico incorporado"})

         }
         },
         function (callback) {

         if (user.hasOwnProperty('pacientesss') && user._id == "5944bd3677e33826242e2745") {
         user.medico.idUsuario = user._id;

         Medico.create(user.medico).then(function () {

         user.idMedico = user.medico._id;
         delete (user.medico);

         return callback(null, {mensagem: "Usuario com ID " + user._id + " desmembrado o medico"});

         }).catch(function (erro) {

         return callback(null, {mensagem: "Erro ao criar perfil medico do usuario " + user._id});

         })

         } else {

         return callback(null, {mensagem: "Usuario " + user._id + " não possui perfil médico incorporado"})

         }
         },
         function (callback) {

         collection.update(
         {"_id": user._id},
         user,
         function (err, dados) {
         if (err) {
         return callback(err, null)
         }
         // console.log(dados)
         return callback(null, {"atualizado": dados.result.nModified > 0});
         }
         )
         },
         ],
         function (erros, resultados) {
         console.log(" - ", resultados[0].mensagem);
         }
         );
         })
         */

      })
    }, function (callback) {

      mongoose.connection.db.collection("users").find().toArray().then(function (dados) {
        async.each(dados, function (valor, callback) {

          Usuarios.insert(valor, function () {
            callback();
          })

        }, function (erros, result) {
          if (erros) {
            console.log('Erro ao inserir dados na collection Usuarios (' + erros.message + ')');
            return callback();
          }
          callback();
        })
      })
    }, function (callback) {
      mongoose.connection.db.collection('users').drop(function () {
        callback();
      })
    }
  ], function () {
    console.log('\n\n Ajustes nas collections finalizado')
  })


})
;

