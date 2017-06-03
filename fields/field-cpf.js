/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

const util = require('../helpers/utils');

const _validate = function (valor) {
  return util.validarCpf(valor);
}


const Field = {
  type: String,
  required: true,
  minlength: 11,
  maxlength: 11,
  validate: _validate
}

module.exports = Field;
