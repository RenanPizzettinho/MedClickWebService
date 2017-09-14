/**
 * Created by Uiliam on 05/06/2017.
 */

'use strict';

let moment = require('moment');

const _set = function (valor) {
  return moment(valor, ["DD/MM/YYYY", "DD-MM-YYYY", "x", "X"]);
};

const Field = {
  type: Date,
  set: _set,
  required: true
};

module.exports = Field;