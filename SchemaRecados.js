//Schema Recados

let schema = new Schema({
  _id: {type: ObjectId},
  de: {type: ObjectId},
  para: {type: ObjectId},
  mensagem: {type: String, required: true, trim: true, minlength: 2},
  recebido: {type: Boolean, required: true},
  respondido: {type: Boolean, required: true},
  dataEnvio: {type: Date, required: true, default: Date.now},
})


let medicoSchema = {
  _id: ObjectId,
  especialidade: String,
  usuario_id : {type: ObjectId, ref: 'Usuario'}
};


let pacienteSchema = {
  _id: ObjectId,
  diabete: Boolean,
  usuario_id : {type: ObjectId, ref: 'Usuario'}
};

let usuarioSchema = {
  _id: ObjectId,
  nome: String,
  login : String,
  senha: String,
  medico_id: {type: ObjectId, ref: 'Medico'},
  paciente_id: {type: ObjectId, ref: 'Paciente'}
};

let atendimentoSchema = {
  id_medico: {type: ObjectId, ref: "Usuario.medico"},
  data: Date,
  // etc...
};

// registro dos models.......


// POPULATE NÃO FUNCIONA, POIS PRECISO BUSCAR NA COLLECTION USUARIO,
// O REGISTRO ONDE USUARIO.MEDICO._ID == ID_MEDICO
Atendimento.find().populate({
  path: 'idMedico',

})
  .exec()
  .then(function (atendimento) {
    res.status(200).json(atendimento);
  }).catch(function (erro) {
  next(erro);
});


