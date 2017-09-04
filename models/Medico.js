/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
  abc: {type: String},
  crm: require('./../fields/field-string'),
  estado: require('./../fields/field-string'),
  distancia: require('./../fields/field-number'),
  atendeEm: require('./../fields/field-string-min-2-char-obrigatorio'),
  especialidade: require('./../fields/field-string-min-2-char-obrigatorio'),
  localizacao: require('./../fields/field-localizacao'),
  diasAtendimentoDomicilio: [require('./../fields/field-enum-dia-semana')],
  idUsuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true}
});

module.exports = mongoose.model('Medico', schema);
/*
let sc2 = new Schema({
  nome: String,
  localizacao: {
    type: [Number],
    index: '2d'
  }
})
let sc1 = new Schema({
  nome: String,
  localizacao: {
    type: String,
    "coordinates" :[]
  }
})
sc1.index({ "localizacao": "2dsphere" });

var mod = mongoose.model('teste', sc1, 'teste');

// var m1 = new mod({
//   nome: 'Petrofab',
//   localizacao: [-49.3032147, -28.7405961] //longitude - latitude
// });



mod.aggregate(
  [
    {
      "$geoNear": {
        "near": {
          "type": "Point",
          "coordinates": [-49.3032147, -28.7405961]
        },
        "distanceField":
          "distance",
        "sperical":
          true,
        "maxDistance":
          10000
      }
    }
  ],

  function (err, results) {
    console.log('erro', err)
    console.log('results', results)
  }
)*/

/*
var userSchema = new Schema({
  localizacao: {
    type: [Number],
    index: '2dsphere'
  },
  distanciaMaxima: Number
});


var User = mongoose.model("User", userSchema, "teste_copy");
*/
// var user = new User({
//   "localizacao": [-73.97, 40.77]
// });


// var user1 = new User({
//   "localizacao": [-73.96, 40.76]

// });

// User.find({
//   localizacao : {
//     $near : [-49.285354, -28.760814],
//     $maxDistance: 3/111.12
//   }
// }).exec().then(function(d){console.log(d)})
// user1.save();




/*
db.teste_copy.aggregate(
  [
    {
      "$geoNear": {
        "near": {
          "type": "Point",
          "coordinates": [-49.285354, -28.760814]
        },
        "distanceField": "distancia",
        "limit": 100000,
        "spherical": true
      }
    },
    {
      "$redact": {
        "$cond": {
          "if": {"$lt": ["$distanciaMaxima", "$radius"]},
          "then": "$$KEEP",
          "else": "$$PRUNE"
        }
      }
    }
  ])
 */

