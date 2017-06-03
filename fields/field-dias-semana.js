/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

const _validate = function (valor) {
  return valor.match(/^(SEG|TER|QUA|QUI|SEX|SAB|DOM)$/);
}


const Field = {
  type: String,
  required: true,
  validate: _validate
}

module.exports = Field;
