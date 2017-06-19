/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

const Field = {
  type: String,
  required: true,
  trim: true,
  minlength: 2,
  // permite mais de um registro unico caso seja NULL
  sparse : true,
  index : {unique : "O valor {VALUE} para o campo {PATH} já foi utilizado e deve ser único."}
}

module.exports = Field;