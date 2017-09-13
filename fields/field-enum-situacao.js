/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

const Field = {
  type: String,
  enum: ["EM_ABERTO", "CONFIRMADO", "CANCELADO", "ATENDIDO"],
  default: 'EM_ABERTO',
  required: true,
  trim: true
};

module.exports = Field;