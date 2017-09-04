/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

const Field = {
  type: String,
  enum: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
  required: true,
  trim: true
};

module.exports = Field;