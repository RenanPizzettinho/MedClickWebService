/**
 * Created by Uiliam on 05/06/2017.
 */

'use strict';

let moment = require('moment');

const _set = function (valor) {
  return moment(valor, ["DD/MM/YYYY", "DD-MM-YYYY", "x", "X", moment.ISO_8601], true);
};

const Field = {
  type: Date,
  required: true,
  set: _set
};

module.exports = Field;