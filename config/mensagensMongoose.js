/**
 * Created by Uiliam on 28/05/2017.
 */
'use strict';

let mongoose = require('mongoose');


let msg = mongoose.Error.messages;
msg.general = {};
/**
 * Mensagem quando falha no validade dos campos
 */
msg.general.default = 'O valor ({VALUE}) é inválido para o campo \"{PATH}\".';
/**
 * Mensagem quando falha no required
 */
msg.general.required = 'Campo \"{PATH}\" é obrigatório.' ;

msg.Number = {};
msg.Number.min = 'O valor informado ({VALUE}) para o campo \"{PATH}\" não pode ser menor que ({MIN}).';
msg.Number.max = 'O valor informado ({VALUE}) para o campo \"{PATH}\" não pode ser maior que ({MAX}).';

msg.Date = {};
msg.Date.min = 'A data informada ({VALUE}) para o campo \"{PATH}\" não pode ser menor que ({MIN}).';
msg.Date.max = 'A data informada ({VALUE}) para o campo \"{PATH}\" não pode ser maior que ({MAX}).';


msg.String = {};
msg.String.enum = 'O valor informado ({VALUE}) para o campo \"{PATH}\" não é válido.';
msg.String.match = 'O valor informado ({VALUE}) para o campo \"{PATH}\" não é válido.';
msg.String.minlength = 'O valor informado ({VALUE}) para o campo \"{PATH}\" não pode ser menor que ({MINLENGTH}).';
msg.String.maxlength = 'O valor informado ({VALUE}) para o campo \"{PATH}\" não pode ser maior que ({MAXLENGTH}).';

