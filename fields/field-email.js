/**
 * Created by Uiliam on 28/05/2017.
 */

'use strict';
const _validate = function (valor) {
  return /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/.test(valor);
}

const _set = function(valor) {return valor.toLowerCase()};

const Field = {
  type : String,
  required : true,
  set : _set,
  validate : _validate,
  default : '',
  index : {unique : "O e-mail {VALUE} já existe."}

}

module.exports = Field;