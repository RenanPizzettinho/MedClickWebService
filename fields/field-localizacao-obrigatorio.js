/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';



const Field = {
  type: [require('./../fields/field-number')], //longitude  x  latitude
  index: '2dsphere',
  required: true
};

module.exports = Field;
