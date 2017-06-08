/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

const Field = {
  type: String,
  required: true,
  trim: true,
  default: '',
  minlength: 2,
  null : true,
  index : {unique : "O valor {VALUE} para o campo {PATH} já foi utilizado e deve ser único."}
}

module.exports = Field;