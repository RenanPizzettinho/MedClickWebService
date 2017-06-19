//Schema Atendimentos

let schema = new Schema({
  _id: {type: ObjectId},
  _idMedico: {type: ObjectId, ref: 'Medico', required: true},
  _idPaciente: {type: ObjectId, ref: 'Paciente', required: true},
  descricaoNecessidade: {type: String, required: true, trim: true, minlength: 5},
  localConsulta: {type: String, required: true, minlength: 5},
  dataConsulta: {type: Date, required: true},
  feedbackConsulta: {type: String},
  situacao:{type: String, enum:["EM_ABERTO", "CONFIRMADO", "CANCELADO", "ATENDIDO"],
            required: true, trim: true
  },
  motivoCanelamento: {type: String},
  dataRegistro: {type: Date, required: true, default: Date.now},
});