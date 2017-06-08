/**
 * Created by Uiliam on 08/06/2017.
 */



//'Schema Usuario

let schema = new Schema({
    nome: {type: String, required: true, trim: true, minlength: 2},
    email: {type: String, required: true, trim: true, index: {unique: true}},
    senha: {type: String, required: true, trim: true, minlength: 6},
    pessoa: {
      cpf: {type: String, required: true, minlength: 11, maxlength: 11, trim: true},
      dt_nascimento: {type: Date, required: true},
    },
    medico: {
      nome: {},
      crm: {type: String, required: true, trim: true, minlength: 2, index: {unique: true}},
      especialidades: [{type: String, required: true, trim: true, minlength: 2}],
      dias_atendimento_domicilio: [{type: String, enum: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'], required: true, trim: true}],
    },
    paciente: {

    }
  })
;