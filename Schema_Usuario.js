//Schema Usuario / Pessoa / Medico / Paciente

let schema = new Schema({
    nome: {type: String, required: true, trim: true, minlength: 2},
    email: {type: String, required: true, trim: true, index: {unique: true}},
    senha: {type: String, required: true, trim: true, minlength: 6},
    pessoa: {
      cpf: {type: String, required: true, minlength: 11, maxlength: 11, trim: true},
      dtNascimento: {type: Date, required: true},
    },
    medico: {
      nome: {},
      crm: {type: String, required: true, trim: true, minlength: 2, index: {unique: true}},
      atendeEm: {type: String, required: true, trim: true, minlength:3},
      especialidade: {type: String, required: true, trim: true, minlength: 2},
      diasAtendimentoDomicilio: [{type: String, enum: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
                                  required: true, trim: true
      }],
    },
    paciente: {
      possuiDiabete: {type: Boolean},
      possuiPressaoAlta: {type: Boolean, required: true}
    }
  })
;