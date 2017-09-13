/**
 * Created by Uiliam on 09/09/2017.
 */

'use strict';
const fs = require('fs');
const path = require('path');

let models = path.join(__dirname, 'models');

fs.readdir(models, function (err, data) {
  data.forEach(function (arquivo) {


    var linha = "";
    var proximo = false;

  //  let schema =.*[\s\S](.*[\s\S]*)\}\)



    fs.readFile(path.join(models, 'Medico.js'), {encoding: 'utf8'}, function (err, dados) {
      // dados.substring(dados.indexOf)
      // console.log(dados.indexOf('let schema')+1, dados.indexOf("})"))
      //     dados = dados.replace(/\n/mi, ' ');
      //     console.log(/(.?[\s\S])\}\)/m.exec(dados)[2])
      //     console.log(/let schema =.*[\s\S](.*[\s\S]*)\}\)/mi.exec(dados))
      // console.log(/(.*)?[\s\S]\}\)/mg.exec(dados)[2])
      dados.split("\n").forEach(function (v) {
        // console.log('linha', v);

        if (proximo) {
          linha += v;
        }

        if (v.indexOf("let schema")) {
        console.log(1, v)
          linha += v;
          proximo = true
        }

        if (v.indexOf("});")) {
          proximo = false;
        }

      })

    })
    // console.log('dados finais', linha);

  })

  // console.log(data)
})