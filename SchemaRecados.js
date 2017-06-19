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
;