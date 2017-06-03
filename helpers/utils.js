/**
 * Created by Uiliam on 29/05/2017.
 */
'use strict';

/**
 * Funcao com utilitarios gerais
 */
function Util() {
};


/**
 * Retorna a string passada por parametro com as iniciais em maiusculo...
 * @param  {String}
 * @return {String}
 */
Util.capitalize = function (string) {
  var string = string.toLowerCase().trim().split(' ');
  for (var i = 0; i < string.length; i++) {

    string[i] = (string[i].charAt(0).toUpperCase() + string[i].slice(1));
  }
  return string.join(" ");
};

/**
 * Validacao de CPFs
 * @param  {STRING} cpf ENTRADA DO CPF PARA Validacao
 * @return {BOOLEAN}     RETORNO TRUE CASO CPF VALIDO E FALSE CASO CPF INVALIDO
 */
Util.validarCpf = function (cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  // Elimina CPFs invalidos conhecidos
  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return false;
  // Valida 1o digito
  var add = 0;
  for (var i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  var rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
    return false;
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
    return false;
  return true;
}

module.exports = Util;